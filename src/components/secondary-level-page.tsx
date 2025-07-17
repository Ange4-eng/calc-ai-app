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
                <Tabs defaultValue="calculators" className="flex-1 flex flex-col">
                    <TabsList className="w-full justify-start overflow-x-auto mb-4 flex-wrap h-auto">
                        <TabsTrigger value="calculators">Calculatrices</TabsTrigger>
                        <TabsTrigger value="functions">Fonctions & Graphes</TabsTrigger>
                        <TabsTrigger value="algebra">Algèbre</TabsTrigger>
                        <TabsTrigger value="geometry-trig">Géométrie & Trigo.</TabsTrigger>
                        <TabsTrigger value="stats-proba">Stats & Proba.</TabsTrigger>
                        <TabsTrigger value="ai-tutors">Tuteurs IA</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="calculators" className="flex-1 overflow-y-auto">
                        <Tabs defaultValue="scientific" className="w-full">
                            <TabsList><TabsTrigger value="scientific">Scientifique</TabsTrigger><TabsTrigger value="financial">Financière</TabsTrigger><TabsTrigger value="converter">Convertisseur</TabsTrigger></TabsList>
                            <TabsContent value="scientific" className="mt-4"><CalcProvider><CalculatorUI /></CalcProvider></TabsContent>
                            <TabsContent value="financial" className="mt-4"><FinancialCalculator /></TabsContent>
                            <TabsContent value="converter" className="mt-4"><UnitConverter /></TabsContent>
                        </Tabs>
                    </TabsContent>

                    <TabsContent value="functions" className="flex-1 overflow-y-auto p-1">
                         <Tabs defaultValue="graphing" className="w-full">
                            <TabsList><TabsTrigger value="graphing">Traceur</TabsTrigger><TabsTrigger value="analyzer">Analyseur</TabsTrigger><TabsTrigger value="comparison">Comparateur</TabsTrigger></TabsList>
                            <TabsContent value="graphing" className="mt-4"><DynamicGraphingCalculator /></TabsContent>
                            <TabsContent value="analyzer" className="mt-4"><FunctionAnalyzer /></TabsContent>
                            <TabsContent value="comparison" className="mt-4"><FunctionComparisonTool /></TabsContent>
                        </Tabs>
                    </TabsContent>

                    <TabsContent value="algebra" className="flex-1 overflow-y-auto p-1">
                        <Tabs defaultValue="polynomials" className="w-full">
                            <TabsList className="w-full justify-start overflow-x-auto mb-4 flex-wrap h-auto">
                                <TabsTrigger value="polynomials">Polynômes</TabsTrigger>
                                <TabsTrigger value="sequences">Suites</TabsTrigger>
                                <TabsTrigger value="number-theory">Théorie des Nombres</TabsTrigger>
                                <TabsTrigger value="systems">Systèmes d'Équations</TabsTrigger>
                                <TabsTrigger value="calculus">Calcul Différentiel</TabsTrigger>
                                <TabsTrigger value="matrices">Matrices</TabsTrigger>
                            </TabsList>
                            <TabsContent value="polynomials" className="mt-4"><AdvancedPolynomialTool /></TabsContent>
                            <TabsContent value="sequences" className="mt-4"><SequenceCalculator /></TabsContent>
                            <TabsContent value="number-theory" className="mt-4"><NumberTheoryTool /></TabsContent>
                            <TabsContent value="systems" className="mt-4"><EquationSolver /></TabsContent>
                            <TabsContent value="calculus" className="mt-4"><CalculusTool /></TabsContent>
                            <TabsContent value="matrices" className="mt-4"><MatrixCalculator /></TabsContent>
                        </Tabs>
                    </TabsContent>

                    <TabsContent value="geometry-trig" className="flex-1 overflow-y-auto p-1">
                        <Tabs defaultValue="trigonometry" className="w-full">
                            <TabsList><TabsTrigger value="trigonometry">Résolveur de Triangles</TabsTrigger><TabsTrigger value="trig-circle">Cercle Trigonométrique</TabsTrigger><TabsTrigger value="vectors">Vecteurs</TabsTrigger><TabsTrigger value="geometry">Formes 2D/3D</TabsTrigger></TabsList>
                            <TabsContent value="trigonometry" className="mt-4"><TrigonometryCalculator /></TabsContent>
                            <TabsContent value="trig-circle" className="mt-4"><TrigonometricCircleTool /></TabsContent>
                            <TabsContent value="vectors" className="mt-4"><VectorCalculator /></TabsContent>
                            <TabsContent value="geometry" className="mt-4"><GeometryCalculator /></TabsContent>
                        </Tabs>
                    </TabsContent>

                     <TabsContent value="stats-proba" className="flex-1 overflow-y-auto p-1">
                        <Tabs defaultValue="statistics" className="w-full">
                            <TabsList><TabsTrigger value="statistics">Statistiques</TabsTrigger><TabsTrigger value="regression">Régression Linéaire</TabsTrigger><TabsTrigger value="probability">Probabilités</TabsTrigger></TabsList>
                            <TabsContent value="statistics" className="mt-4"><StatisticsCalculator /></TabsContent>
                            <TabsContent value="regression" className="mt-4"><LinearRegressionTool /></TabsContent>
                            <TabsContent value="probability" className="mt-4"><ProbabilityCalculator /></TabsContent>
                        </Tabs>
                    </TabsContent>

                     <TabsContent value="ai-tutors" className="flex-1 overflow-y-auto p-1">
                        <Tabs defaultValue="word-problems" className="w-full">
                            <TabsList><TabsTrigger value="word-problems">Résolveur de Problèmes</TabsTrigger><TabsTrigger value="step-by-step">Solution Pas à Pas</TabsTrigger><TabsTrigger value="grader">Évaluateur de Solution</TabsTrigger><TabsTrigger value="corrector">Correcteur d'Erreur</TabsTrigger></TabsList>
                            <TabsContent value="word-problems" className="mt-4"><WordProblemSolver /></TabsContent>
                            <TabsContent value="step-by-step" className="mt-4"><StepByStepSolver /></TabsContent>
                            <TabsContent value="grader" className="mt-4"><SolutionGrader /></TabsContent>
                             <TabsContent value="corrector" className="mt-4"><ErrorCorrector /></TabsContent>
                        </Tabs>
                    </TabsContent>

                </Tabs>
            </CardContent>
        </Card>
    );
}
