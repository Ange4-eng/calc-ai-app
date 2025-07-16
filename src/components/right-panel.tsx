"use client";

import { History, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryPanel } from "@/components/history-panel";
import { AIToolsPanel } from "@/components/ai-tools-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RightPanel() {
  return (
    <Card className="h-full border-0 lg:border">
      <Tabs defaultValue="history" className="h-full flex flex-col">
        <CardHeader className="p-4">
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" /> Historique
            </TabsTrigger>
            <TabsTrigger value="ai-tools">
                <Lightbulb className="mr-2 h-4 w-4" /> Outils IA
            </TabsTrigger>
            </TabsList>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 sm:p-4">
            <TabsContent value="history" className="h-full m-0">
                <HistoryPanel />
            </TabsContent>
            <TabsContent value="ai-tools" className="m-0">
                <AIToolsPanel />
            </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
