"use client";

import { CalculatorUI } from "@/components/calculator-ui";
import { EquationSolver } from "@/components/equation-solver";
import { WordProblemSolver } from "@/components/word-problem-solver";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorIcon, Sigma, LineChart, BookText, CheckCircle2, BarChart2, Shapes, Scale, FunctionSquare, Grid3x3, PiggyBank, Blocks, ListOrdered, Triangle, FileSignature, BookOpenCheck, Waypoints, Orbit, GitCompareArrows, Variable, TrendingUp, Dice5 } from "lucide-react";
import { ErrorCorrector } from "./error-corrector";
import { StatisticsCalculator } from "./statistics-calculator";
import { GeometryCalculator } from "./geometry-calculator";
import { UnitConverter } from "./unit-converter";
import { CalculusTool } from "./calculus-tool";
import { MatrixCalculator } from "./matrix-calculator";
import { FinancialCalculator } from "./financial-calculator";
import { ProbabilityCalculator } from "./probability-calculator";
import { StepByStepSolver } from "./step-by-step-solver";
import { TrigonometryCalculator } from "./trigonometry-calculator";
import { FunctionAnalyzer } from "./function-analyzer";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import { AdvancedPolynomialTool } from "./advanced-polynomial-tool";
import { SequenceCalculator } from "./sequence-calculator";
import { VectorCalculator } from "./vector-calculator";
import { TrigonometricCircleTool } from "./trigonometric-circle-tool";
import { FunctionComparisonTool } from "./function-comparison-tool";
import { NumberTheoryTool } from "./number-theory-tool";
import { LinearRegressionTool } from "./linear-regression-tool";
import { SolutionGrader } from "./solution-grader";
import { CalcProvider } from "@/context/calc-context";

const DynamicGraphingCalculator = dynamic(
    () => import('@/components/graphing-calculator').then(mod => mod.GraphingCalculator),
    {
      ssr: false,
      loading: () => (
          <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-96 w-full" />
          </div>
      )
    }
);

export function SecondaryLevelPage() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Outils pour le Secondaire</CardTitle>
                <CardDescription>
                    Une suite d'outils complets pour les mathématiques du secondaire, incluant la calculatrice scientifique.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-4 flex flex-col overflow-hidden">
                <Tabs defaultValue="scientific" className="flex-1 flex flex-col">
                    <TabsList className="w-full justify-start overflow-x-auto mb-4">
                        <TabsTrigger value="scientific">
                            <CalculatorIcon className="mr-2 h-4 w-4" />
                            Calculatrice
                        </TabsTrigger>
                        <TabsTrigger value="graphing">
                            <LineChart className="mr-2 h-4 w-4" />
                            Graphique
                        </TabsTrigger>
                        <TabsTrigger value="analyzer">
                            <FileSignature className="mr-2 h-4 w-4" />
                            Analyse
                        </TabsTrigger>
                         <TabsTrigger value="comparison">
                            <GitCompareArrows className="mr-2 h-4 w-4" />
                            Comparaison
                        </TabsTrigger>
                        <TabsTrigger value="polynomials">
                            <Sigma className="mr-2 h-4 w-4" />
                            Polynômes
                        </TabsTrigger>
                         <TabsTrigger value="sequences">
                            <ListOrdered className="mr-2 h-4 w-4" />
                            Suites
                        </TabsTrigger>
                         <TabsTrigger value="number-theory">
                            <Variable className="mr-2 h-4 w-4" />
                            Théorie des Nombres
                        </TabsTrigger>
                        <TabsTrigger value="trigonometry">
                            <Triangle className="mr-2 h-4 w-4" />
                            Trigonométrie
                        </TabsTrigger>
                         <TabsTrigger value="trig-circle">
                            <Orbit className="mr-2 h-4 w-4" />
                            Cercle Trig
                        </TabsTrigger>
                        <TabsTrigger value="vectors">
                            <Waypoints className="mr-2 h-4 w-4" />
                            Vecteurs
                        </TabsTrigger>
                        <TabsTrigger value="systems">
                            <Blocks className="mr-2 h-4 w-4" />
                            Systèmes
                        </TabsTrigger>
                        <TabsTrigger value="calculus">
                            <FunctionSquare className="mr-2 h-4 w-4" />
                            Calcul
                        </TabsTrigger>
                        <TabsTrigger value="matrices">
                            <Grid3x3 className="mr-2 h-4 w-4" />
                            Matrices
                        </TabsTrigger>
                        <TabsTrigger value="financial">
                            <PiggyBank className="mr-2 h-4 w-4" />
                            Financier
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
                            Tuteur IA
                        </TabsTrigger>
                         <TabsTrigger value="step-by-step">
                            <ListOrdered className="mr-2 h-4 w-4" />
                            Pas à pas
                        </TabsTrigger>
                        <TabsTrigger value="grader">
                             <BookOpenCheck className="mr-2 h-4 w-4" />
                            Évaluateur
                        </TabsTrigger>
                        <TabsTrigger value="statistics">
                            <BarChart2 className="mr-2 h-4 w-4" />
                            Statistiques
                        </TabsTrigger>
                        <TabsTrigger value="regression">
                             <TrendingUp className="mr-2 h-4 w-4" />
                            Régression
                        </TabsTrigger>
                        <TabsTrigger value="probability">
                            <Dice5 className="mr-2 h-4 w-4" />
                            Probabilités
                        </TabsTrigger>
                        <TabsTrigger value="corrector">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Correcteur
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="scientific" className="flex-1 overflow-y-auto">
                        <CalcProvider>
                            <CalculatorUI />
                        </CalcProvider>
                    </TabsContent>
                    <TabsContent value="graphing" className="flex-1 overflow-y-auto p-1">
                        <DynamicGraphingCalculator />
                    </TabsContent>
                    <TabsContent value="analyzer" className="flex-1 overflow-y-auto p-1">
                        <FunctionAnalyzer />
                    </TabsContent>
                    <TabsContent value="comparison" className="flex-1 overflow-y-auto p-1">
                        <FunctionComparisonTool />
                    </TabsContent>
                    <TabsContent value="polynomials" className="flex-1 overflow-y-auto p-1">
                        <AdvancedPolynomialTool />
                    </TabsContent>
                     <TabsContent value="sequences" className="flex-1 overflow-y-auto p-1">
                        <SequenceCalculator />
                    </TabsContent>
                    <TabsContent value="number-theory" className="flex-1 overflow-y-auto p-1">
                        <NumberTheoryTool />
                    </TabsContent>
                    <TabsContent value="trigonometry" className="flex-1 overflow-y-auto p-1">
                        <TrigonometryCalculator />
                    </TabsContent>
                     <TabsContent value="trig-circle" className="flex-1 overflow-y-auto p-1">
                        <TrigonometricCircleTool />
                    </TabsContent>
                    <TabsContent value="vectors" className="flex-1 overflow-y-auto p-1">
                        <VectorCalculator />
                    </TabsContent>
                    <TabsContent value="systems" className="flex-1 overflow-y-auto p-1">
                        <EquationSolver />
                    </TabsContent>
                    <TabsContent value="calculus" className="flex-1 overflow-y-auto p-1">
                        <CalculusTool />
                    </TabsContent>
                    <TabsContent value="matrices" className="flex-1 overflow-y-auto p-1">
                        <MatrixCalculator />
                    </TabsContent>
                    <TabsContent value="financial" className="flex-1 overflow-y-auto p-1">
                        <FinancialCalculator />
                    </TabsContent>
                    <TabsContent value="geometry" className="flex-1 overflow-y-auto p-1">
                        <GeometryCalculator />
                    </TabsContent>
                    <TabsContent value="converter" className="flex-1 overflow-y-auto p-1">
                        <UnitConverter />
                    </TabsContent>
                    <TabsContent value="word-problems" className="flex-1 overflow-y-auto p-1">
                        <WordProblemSolver />
                    </TabsContent>
                     <TabsContent value="step-by-step" className="flex-1 overflow-y-auto p-1">
                        <StepByStepSolver />
                    </TabsContent>
                    <TabsContent value="grader" className="flex-1 overflow-y-auto p-1">
                        <SolutionGrader />
                    </TabsContent>
                    <TabsContent value="statistics" className="flex-1 overflow-y-auto p-1">
                        <StatisticsCalculator />
                    </TabsContent>
                    <TabsContent value="regression" className="flex-1 overflow-y-auto p-1">
                        <LinearRegressionTool />
                    </TabsContent>
                    <TabsContent value="probability" className="flex-1 overflow-y-auto p-1">
                        <ProbabilityCalculator />
                    </TabsContent>
                    <TabsContent value="corrector" className="flex-1 overflow-y-auto p-1">
                        <ErrorCorrector />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
