"use client";

import { useCalc } from "@/context/calc-context";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

const buttonGrid = [
  { value: "x²", label: "x²", type: "sci_action" },
  { value: "xʸ", label: "xʸ", type: "sci_action" },
  { value: "sin", label: "sin", type: "sci_action" },
  { value: "cos", label: "cos", type: "sci_action" },
  { value: "tan", label: "tan", type: "sci_action" },

  { value: "√", label: "√", type: "sci_action" },
  { value: "x!", label: "x!", type: "sci_action" },
  { value: "ln", label: "ln", type: "sci_action" },
  { value: "log", label: "log", type: "sci_action" },
  { value: "1/x", label: "1/x", type: "sci_action" },

  { value: "C", label: "C", type: "action" },
  { value: "(", label: "(", type: "action" },
  { value: ")", label: ")", type: "action" },
  { value: "DEL", label: "DEL", type: "action" },
  { value: "/", label: "÷", type: "operator" },
  
  { value: "Math.PI", label: "π", type: "action" },
  { value: "7", label: "7", type: "number" },
  { value: "8", label: "8", type: "number" },
  { value: "9", label: "9", type: "number" },
  { value: "*", label: "×", type: "operator" },

  { value: "Math.E", label: "e", type: "action" },
  { value: "4", label: "4", type: "number" },
  { value: "5", label: "5", type: "number" },
  { value: "6", label: "6", type: "number" },
  { value: "-", label: "−", type: "operator" },
  
  { value: "%", label: "%", type: "operator" },
  { value: "1", label: "1", type: "number" },
  { value: "2", label: "2", type: "number" },
  { value: "3", label: "3", type: "number" },
  { value: "+", label: "+", type: "operator" },
  
  { value: "AI_SIMPLIFY", label: "✨", type: "ai_action" },
  { value: "0", label: "0", type: "number" },
  { value: ".", label: ".", type: "number" },
  { value: "=", label: "=", type: "equals", className: "col-span-2" },
];

export function Calculator() {
  const { expression, isError, handleButtonClick, handleAiSimplify, isSimplifying } = useCalc();

  return (
    <div className="w-full max-w-lg rounded-xl border bg-card p-4 shadow-lg">
      <div
        className={`mb-4 h-20 rounded-lg bg-background p-4 text-right font-mono text-4xl font-bold ${isError ? 'text-destructive' : 'text-foreground'}`}
      >
        <span className="block w-full overflow-x-auto break-all">
            {expression || "0"}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {buttonGrid.map((btn) => {
            if (btn.value === 'AI_SIMPLIFY') {
                return (
                    <Button
                        key={btn.value}
                        onClick={handleAiSimplify}
                        variant="secondary"
                        size="lg"
                        className="h-14 text-xl transition-transform active:scale-95"
                        disabled={isSimplifying}
                        title="Simplification Exacte par IA"
                    >
                       {isSimplifying ? <Loader2 className="animate-spin" /> : <Sparkles/>}
                    </Button>
                )
            }
            return (
              <Button
                key={btn.value}
                onClick={() => handleButtonClick(btn.value)}
                variant={
                    btn.type === "operator" ? "secondary"
                  : btn.type === "action" || btn.type === "sci_action" ? "ghost"
                  : btn.type === "equals" ? "default"
                  : "outline"
                }
                size="lg"
                className={`h-14 text-xl transition-transform active:scale-95 ${btn.className || ''} ${btn.type === 'equals' ? 'bg-primary hover:bg-primary/90' : ''} ${btn.type === 'sci_action' ? 'text-primary' : ''}`}
                disabled={isSimplifying && btn.type !== 'action'}
              >
                {btn.label}
              </Button>
            )
        })}
      </div>
    </div>
  );
}
