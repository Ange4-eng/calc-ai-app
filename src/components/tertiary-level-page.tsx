
"use client";

import { CalculatorUI } from "@/components/calculator-ui";
import { EquationSolver } from "@/components/equation-solver";
import { WordProblemSolver } from "@/components/word-problem-solver";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorIcon, LineChart, Sigma, BookText, BarChart2, CheckCircle2, Shapes, Scale, FunctionSquare, Grid3x3, PiggyBank, Blocks, ListOrdered, Triangle, FileSignature, BookOpenCheck, Atom, Binary, InfinityIcon, Waves, Shuffle, Brain, FlaskConical, TrendingUp, Variable, Orbit, Waypoints, GitCompareArrows, Dice5, Lock } from "lucide-react";
import { StatisticsCalculator } from "@/components/statistics-calculator";
import { ErrorCorrector } from "@/components/error-corrector";
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
import { PhysicsCalculator } from "./physics-calculator";
import { CsCalculator } from "./cs-calculator";
import { LimitCalculator } from "./limit-calculator";
import { FourierSeriesCalculator } from "./fourier-series-calculator";
import { LaplaceTransformCalculator } from "./laplace-transform-calculator";
import { KnowledgeEngine } from "./knowledge-engine";
import { ChemistryTool } from "./chemistry-tool";
import { SequenceCalculator } from "./sequence-calculator";
import { LinearRegressionTool } from "./linear-regression-tool";
import { NumberTheoryTool } from "./number-theory-tool";
import { FunctionComparisonTool } from "./function-comparison-tool";
import { TrigonometricCircleTool } from "./trigonometric-circle-tool";
import { VectorCalculator } from "./vector-calculator";
import { ProFeatureWrapper } from "./pro-feature-wrapper";
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

export function TertiaryLevelPage() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Outils pour le Supérieur</CardTitle>
                <CardDescription>
                    La suite complète d'outils pour les mathématiques de niveau universitaire et au-delà.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-4 flex flex-col overflow-hidden">
                <Tabs defaultValue="knowledge-engine" className="flex-1 flex flex-col">
                    <TabsList className="w-full justify-start overflow-x-auto mb-4">
                         <TabsTrigger value="knowledge-engine">
                            <Brain className="mr-2 h-4 w-4" />
                            Moteur Scientifique
                        </TabsTrigger>
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
                         <TabsTrigger value="calculus">
                            <FunctionSquare className="mr-2 h-4 w-4" />
                            Calcul Différentiel
                        </TabsTrigger>
                         <TabsTrigger value="limits">
                            <InfinityIcon className="mr-2 h-4 w-4" />
                            Limites
                        </TabsTrigger>
                        <TabsTrigger value="fourier">
                            <Waves className="mr-2 h-4 w-4" />
                            Séries de Fourier
                        </TabsTrigger>
                        <TabsTrigger value="laplace">
                            <Shuffle className="mr-2 h-4 w-4" />
                            Transformée de Laplace
                        </TabsTrigger>
                        <TabsTrigger value="matrices">
                            <Grid3x3 className="mr-2 h-4 w-4" />
                            Matrices
                        </TabsTrigger>
                        <TabsTrigger value="physics">
                            <Atom className="mr-2 h-4 w-4" />
                            Physique
                        </TabsTrigger>
                         <TabsTrigger value="chemistry">
                            <FlaskConical className="mr-2 h-4 w-4" />
                            Chimie
                        </TabsTrigger>
                         <TabsTrigger value="cs">
                            <Binary className="mr-2 h-4 w-4" />
                            Informatique
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
                    <TabsContent value="knowledge-engine" className="flex-1 overflow-y-auto p-1">
                        <ProFeatureWrapper>
                           <KnowledgeEngine />
                        </ProFeatureWrapper>
                    </TabsContent>
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
                     <TabsContent value="polynomials" className="flex-1 overflow-y-auto p-1">
                        <AdvancedPolynomialTool />
                    </TabsContent>
                    <TabsContent value="sequences" className="flex-1 overflow-y-auto p-1">
                        <SequenceCalculator />
                    </TabsContent>
                     <TabsContent value="number-theory" className="flex-1 overflow-y-auto p-1">
                        <NumberTheoryTool />
                    </TabsContent>
                    <TabsContent value="calculus" className="flex-1 overflow-y-auto p-1">
                        <CalculusTool />
                    </TabsContent>
                    <TabsContent value="limits" className="flex-1 overflow-y-auto p-1">
                        <LimitCalculator />
                    </TabsContent>
                    <TabsContent value="fourier" className="flex-1 overflow-y-auto p-1">
                        <FourierSeriesCalculator />
                    </TabsContent>
                    <TabsContent value="laplace" className="flex-1 overflow-y-auto p-1">
                        <LaplaceTransformCalculator />
                    </TabsContent>
                    <TabsContent value="matrices" className="flex-1 overflow-y-auto p-1">
                        <MatrixCalculator />
                    </TabsContent>
                    <TabsContent value="physics" className="flex-1 overflow-y-auto p-1">
                        <PhysicsCalculator />
                    </TabsContent>
                    <TabsContent value="chemistry" className="flex-1 overflow-y-auto p-1">
                        <ChemistryTool />
                    </TabsContent>
                    <TabsContent value="cs" className="flex-1 overflow-y-auto p-1">
                        <CsCalculator />
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
