"use client";

import { BasicCalculator } from "@/components/basic-calculator";
import { ErrorCorrector } from "./error-corrector";
import { GeometryCalculator } from "./geometry-calculator";
import { UnitConverter } from "./unit-converter";
import { WordProblemSolver } from "@/components/word-problem-solver";
import { ArithmeticCalculator } from "./arithmetic-calculator";

import {
  BookText,
  Calculator as CalculatorIcon,
  CheckCircle2,
  Scale,
  Shapes,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { CalcProvider } from "@/context/calc-context";

export function PrimaryLevelPage() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Outils pour le Primaire</CardTitle>
        <CardDescription>
          Des outils simples pour les premiers pas en mathématiques, incluant un
          solveur de problèmes par IA.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4 flex flex-col overflow-hidden">
        <Tabs defaultValue="calculator" className="w-full flex-1 flex flex-col">
          <TabsList className="w-full justify-start overflow-x-auto mb-4">
            <TabsTrigger value="calculator">
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Calculatrice
            </TabsTrigger>
             <TabsTrigger value="arithmetic">
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Arithmétique
            </TabsTrigger>
            <TabsTrigger value="geometry">
              <Shapes className="mr-2 h-4 w-4" />
              Géométrie
            </TabsTrigger>
            <TabsTrigger value="converter">
              <Scale className="mr-2 h-4 w-4" />
              Convertisseur
            </TabsTrigger>
            <TabsTrigger value="word-problems">
              <BookText className="mr-2 h-4 w-4" />
              Problèmes
            </TabsTrigger>
            <TabsTrigger value="corrector">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Correcteur
            </TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="flex-1 overflow-y-auto">
            <div className="flex justify-center items-center h-full">
              <CalcProvider>
                <BasicCalculator />
              </CalcProvider>
            </div>
          </TabsContent>
           <TabsContent value="arithmetic" className="flex-1 overflow-y-auto p-1">
            <ArithmeticCalculator />
          </TabsContent>
          <TabsContent value="geometry" className="flex-1 overflow-y-auto p-1">
            <GeometryCalculator />
          </TabsContent>
          <TabsContent
            value="converter"
            className="flex-1 overflow-y-auto p-1"
          >
            <UnitConverter />
          </TabsContent>
          <TabsContent
            value="word-problems"
            className="flex-1 overflow-y-auto p-1"
          >
            <WordProblemSolver />
          </TabsContent>
          <TabsContent
            value="corrector"
            className="flex-1 overflow-y-auto p-1"
          >
            <ErrorCorrector />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
