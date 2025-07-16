"use client";

import { useCalc } from "@/context/calc-context";
import { Button } from "@/components/ui/button";

const buttonGrid = [
  { value: "C", label: "C", type: "action" },
  { value: "DEL", label: "DEL", type: "action" },
  { value: "%", label: "%", type: "operator" },
  { value: "/", label: "÷", type: "operator" },
  
  { value: "7", label: "7", type: "number" },
  { value: "8", label: "8", type: "number" },
  { value: "9", label: "9", type: "number" },
  { value: "*", label: "×", type: "operator" },

  { value: "4", label: "4", type: "number" },
  { value: "5", label: "5", type: "number" },
  { value: "6", label: "6", type: "number" },
  { value: "-", label: "−", type: "operator" },
  
  { value: "1", label: "1", type: "number" },
  { value: "2", label: "2", type: "number" },
  { value: "3", label: "3", type: "number" },
  { value: "+", label: "+", type: "operator" },
  
  { value: "0", label: "0", type: "number", className: "col-span-2" },
  { value: ".", label: ".", type: "number" },
  { value: "=", label: "=", type: "equals" },
];

export function BasicCalculator() {
  const { expression, isError, handleButtonClick } = useCalc();

  return (
    <div className="w-full max-w-xs rounded-xl border bg-card p-4 shadow-lg mx-auto">
      <div
        className={`mb-4 h-20 rounded-lg bg-background p-4 text-right font-mono text-4xl font-bold ${isError ? 'text-destructive' : 'text-foreground'}`}
      >
        <span className="block w-full overflow-x-auto break-all">
            {expression || "0"}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttonGrid.map((btn) => (
          <Button
            key={btn.value}
            onClick={() => handleButtonClick(btn.value)}
            variant={
                btn.type === "operator" ? "secondary"
              : btn.type === "action" ? "ghost"
              : btn.type === "equals" ? "default"
              : "outline"
            }
            size="lg"
            className={`h-16 text-2xl transition-transform active:scale-95 ${btn.className || ''} ${btn.type === 'equals' ? 'bg-primary hover:bg-primary/90' : ''}`}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
