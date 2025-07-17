
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { simplifyExpression } from '@/ai/flows/simplify-expression';
import { useToast } from '@/hooks/use-toast';
import { getAIFriendlyErrorMessage } from '@/lib/utils';

interface CalcContextType {
  expression: string;
  isError: boolean;
  history: { expression: string; result: string }[];
  handleButtonClick: (value: string) => void;
  clearHistory: () => void;
  loadFromHistory: (calc: { expression: string; result: string }) => void;
  isSimplifying: boolean;
  handleAiSimplify: () => Promise<void>;
}

const CalcContext = createContext<CalcContextType | undefined>(undefined);

// Helper to evaluate mathematical expressions safely
const evaluateExpression = (expr: string): string => {
  try {
    // Replace user-friendly symbols with JS-compatible ones
    let sanitizedExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/(\d+\.?\d*)!/g, (match, n) => `factorial(${n})`)
      .replace(/\^/g, '**') // Handles x^y
      .replace(/sin\(/g, 'Math.sin(Math.PI/180 *')
      .replace(/cos\(/g, 'Math.cos(Math.PI/180 *')
      .replace(/tan\(/g, 'Math.tan(Math.PI/180 *')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(');

    // Function to calculate factorial
    const factorial = (n: number): number => {
      if (n < 0 || n !== Math.floor(n)) return NaN;
      if (n === 0 || n === 1) return 1;
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    };
    
    // Using Function constructor for safe evaluation
    const result = new Function('factorial', `return ${sanitizedExpr}`)(factorial);
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error("Invalid calculation");
    }
    
    // Check if result is too large or small to display
    if (Math.abs(result) > 1e15 || (Math.abs(result) < 1e-9 && result !== 0)) {
        return result.toExponential(4);
    }
    
    return String(Number(result.toFixed(10)));
  } catch (error) {
    console.error("Evaluation error:", error);
    throw new Error("Expression Invalide");
  }
};


export function CalcProvider({ children }: { children: ReactNode }) {
  const [expression, setExpression] = useState('');
  const [isError, setIsError] = useState(false);
  const [history, setHistory] = useLocalStorage<{ expression: string; result: string }[]>('calc-history', []);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const { toast } = useToast();

  const handleButtonClick = (value: string) => {
    if (isError) {
        setExpression('');
        setIsError(false);
    }

    if (value === 'C') {
      setExpression('');
    } else if (value === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else if (value === '=') {
      if (expression.trim() === '') return;
      try {
        const result = evaluateExpression(expression);
        setHistory(prev => [{ expression, result }, ...prev].slice(0, 50));
        setExpression(result);
      } catch (error) {
        setIsError(true);
        setExpression((error as Error).message);
      }
    } else if (value === '%') {
      try {
        const result = evaluateExpression(expression)
        setExpression(String(parseFloat(result) / 100));
      } catch (error) {
         setIsError(true);
         setExpression("Erreur");
      }
    } else if (['sin', 'cos', 'tan', '√', 'log', 'ln'].includes(value)) {
        setExpression(prev => {
            const lastChar = prev.slice(-1);
            if (/\d|\)/.test(lastChar)) {
                return `${prev}×${value}(`;
            }
            return `${prev}${value}(`;
        });
    } else if (value === 'x²') {
        setExpression(prev => `(${prev})**2`);
    } else if (value === 'xʸ') {
        setExpression(prev => `(${prev})**`);
    } else if (value === 'x!') {
        setExpression(prev => `(${prev})!`);
    } else if (value === '1/x') {
        setExpression(prev => `1/(${prev})`);
    } else {
      setExpression(prev => prev + value);
    }
  };
  
  const handleAiSimplify = async () => {
    if (!expression) return;
    setIsSimplifying(true);
    try {
        const result = await simplifyExpression({ expression });
        setExpression(result.simplifiedExpression);
        toast({
            title: "Simplification Réussie",
            description: result.explanation,
        });
    } catch(e) {
        console.error("AI simplification failed:", e);
        toast({
            variant: "destructive",
            title: "Erreur de l'IA",
            description: getAIFriendlyErrorMessage(e),
        });
    } finally {
        setIsSimplifying(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };
  
  const loadFromHistory = (calc: { expression: string; result: string }) => {
    setExpression(calc.expression);
    setIsError(false);
  };

  const value = {
    expression,
    isError,
    history,
    handleButtonClick,
    clearHistory,
    loadFromHistory,
    isSimplifying,
    handleAiSimplify,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
}

export function useCalc() {
  const context = useContext(CalcContext);
  if (context === undefined) {
    throw new Error('useCalc must be used within a CalcProvider');
  }
  return context;
}
