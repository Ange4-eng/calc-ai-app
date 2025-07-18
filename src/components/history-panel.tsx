"use client";

import { useCalc } from "@/context/calc-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardDescription, CardTitle } from "./ui/card";
import { History, Trash2 } from "lucide-react";

export function HistoryPanel() {
  const { history, clearHistory, loadFromHistory } = useCalc();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Historique</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={clearHistory}>
          <Trash2 className="h-4 w-4 mr-2"/>
          Effacer
        </Button>
      </div>
      <div className="flex-1">
        {history.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed bg-background/50">
            <p className="text-muted-foreground">Aucun historique</p>
          </div>
        ) : (
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-col gap-2">
              {history.slice().reverse().map((calc, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-muted"
                  onClick={() => loadFromHistory(calc)}
                >
                  <p className="truncate text-sm text-muted-foreground">{calc.expression} =</p>
                  <p className="text-xl font-bold text-foreground">{calc.result}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
