"use client";

import { useCalc } from "@/context/calc-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardDescription, CardTitle } from "./ui/card";

export function HistoryPanel() {
  const { history, clearHistory, loadFromHistory } = useCalc();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <CardTitle className="text-lg">Historique des calculs</CardTitle>
          <CardDescription className="text-sm">Cliquez pour réutiliser un calcul.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={clearHistory}>
          Effacer
        </Button>
      </div>
      <div className="flex-1">
        {history.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
            <p className="text-muted-foreground">Aucun historique pour le moment</p>
          </div>
        ) : (
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-col gap-2">
              {history.map((calc, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-muted"
                  onClick={() => loadFromHistory(calc)}
                >
                  <p className="truncate text-sm text-muted-foreground">{calc.expression}</p>
                  <p className="text-lg font-bold text-foreground">{calc.result}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
