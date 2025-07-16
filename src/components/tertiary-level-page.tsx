"use client";

import { useState } from 'react';
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from './ui/button';
import { ArrowLeft, Brain, CalculatorIcon, LineChart, FileSignature, BookText, GitCompareArrows, Triangle, Orbit, Waypoints, Blocks, Sigma, ListOrdered, Variable, FunctionSquare, InfinityIcon, Waves, Shuffle, Grid3x3, Atom, FlaskConical, Binary, PiggyBank, Shapes, Scale, BookOpenCheck, BarChart2, TrendingUp, Dice5, CheckCircle2 } from "lucide-react";
import { ToolCard } from './tool-card';

// AI-powered tools might need special wrappers or context
import { KnowledgeEngine } from "./knowledge-engine";
import { ProFeatureWrapper } from './pro-feature-wrapper';
import { WordProblemSolver } from "@/components/word-problem-solver";
import { FunctionAnalyzer } from "./function-analyzer";
import { SolutionGrader } from "./solution-grader";
import { LinearRegressionTool } from "./linear-regression-tool";
import { StatisticsCalculator } from "./statistics-calculator";
import { ErrorCorrector } from "./error-corrector";
import { CalculusTool } from './calculus-tool';
import { MatrixCalculator } from './matrix-calculator';
import { EquationSolver } from './equation-solver';
import { AdvancedPolynomialTool } from './advanced-polynomial-tool';
import { TrigonometryCalculator } from './trigonometry-calculator';
import { NumberTheoryTool } from './number-theory-tool';
import { VectorCalculator } from './vector-calculator';
import { SequenceCalculator } from './sequence-calculator';
import { StepByStepSolver } from './step-by-step-solver';
import { LimitCalculator } from './limit-calculator';
import { FourierSeriesCalculator } from './fourier-series-calculator';
import { LaplaceTransformCalculator } from './laplace-transform-calculator';

// Standard calculators
import { CalcProvider } from "@/context/calc-context";
import { CalculatorUI } from "@/components/calculator-ui";
import { FunctionComparisonTool } from "./function-comparison-tool";
import { TrigonometricCircleTool } from "./trigonometric-circle-tool";
import { PhysicsCalculator } from "./physics-calculator";
import { ChemistryTool } from "./chemistry-tool";
import { CsCalculator } from "./cs-calculator";
import { FinancialCalculator } from "./financial-calculator";
import { GeometryCalculator } from "./geometry-calculator";
import { UnitConverter } from "./unit-converter";
import { ProbabilityCalculator } from "./probability-calculator";


const DynamicGraphingCalculator = dynamic(
    () => import('@/components/graphing-calculator').then(mod => mod.GraphingCalculator),
    {
        ssr: false,
        loading: () => (
            <div className="space-y-4 p-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        )
    }
);

const tools = [
    { id: "knowledge-engine", title: "Moteur Scientifique", icon: Brain, component: <ProFeatureWrapper><KnowledgeEngine /></ProFeatureWrapper> },
    { id: "scientific", title: "Calculatrice Scientifique", icon: CalculatorIcon, component: <CalcProvider><CalculatorUI /></CalcProvider> },
    { id: "graphing", title: "Traceur de Graphes", icon: LineChart, component: <DynamicGraphingCalculator /> },
    { id: "analyzer", title: "Analyseur de Fonctions", icon: FileSignature, component: <FunctionAnalyzer /> },
    { id: "word-problems", title: "Tuteur IA", icon: BookText, component: <WordProblemSolver /> },
    { id: "comparison", title: "Comparateur d'Images", icon: GitCompareArrows, component: <FunctionComparisonTool /> },
    { id: "trigonometry", title: "Résolveur de Triangles", icon: Triangle, component: <TrigonometryCalculator /> },
    { id: "trig-circle", title: "Cercle Trigonométrique", icon: Orbit, component: <TrigonometricCircleTool /> },
    { id: "vectors", title: "Calculateur de Vecteurs", icon: Waypoints, component: <VectorCalculator /> },
    { id: "systems", title: "Résolveur de Systèmes", icon: Blocks, component: <EquationSolver /> },
    { id: "polynomials", title: "Analyse de Polynômes", icon: Sigma, component: <AdvancedPolynomialTool /> },
    { id: "sequences", title: "Calculateur de Suites", icon: ListOrdered, component: <SequenceCalculator /> },
    { id: "number-theory", title: "Théorie des Nombres", icon: Variable, component: <NumberTheoryTool /> },
    { id: "calculus", title: "Calcul Différentiel", icon: FunctionSquare, component: <CalculusTool /> },
    { id: "limits", title: "Calculateur de Limites", icon: InfinityIcon, component: <LimitCalculator /> },
    { id: "fourier", title: "Séries de Fourier", icon: Waves, component: <FourierSeriesCalculator /> },
    { id: "laplace", title: "Transformée de Laplace", icon: Shuffle, component: <LaplaceTransformCalculator /> },
    { id: "matrices", title: "Calculatrice Matricielle", icon: Grid3x3, component: <MatrixCalculator /> },
    { id: "physics", title: "Outils de Physique", icon: Atom, component: <PhysicsCalculator /> },
    { id: "chemistry", title: "Outils de Chimie", icon: FlaskConical, component: <ChemistryTool /> },
    { id: "cs", title: "Outils d'Informatique", icon: Binary, component: <CsCalculator /> },
    { id: "financial", title: "Calculatrice Financière", icon: PiggyBank, component: <FinancialCalculator /> },
    { id: "geometry", title: "Géométrie 2D & 3D", icon: Shapes, component: <GeometryCalculator /> },
    { id: "converter", title: "Convertisseur d'Unités", icon: Scale, component: <UnitConverter /> },
    { id: "step-by-step", title: "Résolution Pas à Pas", icon: ListOrdered, component: <StepByStepSolver /> },
    { id: "grader", title: "Évaluateur de Solutions", icon: BookOpenCheck, component: <SolutionGrader /> },
    { id: "statistics", title: "Analyse Statistique", icon: BarChart2, component: <StatisticsCalculator /> },
    { id: "regression", title: "Régression Linéaire", icon: TrendingUp, component: <LinearRegressionTool /> },
    { id: "probability", title: "Calculs de Probabilités", icon: Dice5, component: <ProbabilityCalculator /> },
    { id: "corrector", title: "Correcteur d'Erreurs", icon: CheckCircle2, component: <ErrorCorrector /> },
];

export function TertiaryLevelPage() {
    const [activeTool, setActiveTool] = useState<string | null>(null);

    const selectedTool = tools.find(t => t.id === activeTool);

    if (activeTool && selectedTool) {
        return (
            <div className="flex flex-col h-full">
                <Button variant="ghost" onClick={() => setActiveTool(null)} className="mb-4 self-start">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à tous les outils
                </Button>
                <div className="flex-1 overflow-y-auto p-1">
                    {selectedTool.component}
                </div>
            </div>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Outils pour le Supérieur</CardTitle>
                <CardDescription>
                    La suite complète d'outils pour les mathématiques de niveau universitaire et au-delà.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-y-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tools.map((tool) => (
                        <ToolCard
                            key={tool.id}
                            icon={tool.icon}
                            title={tool.title}
                            description=""
                            onClick={() => setActiveTool(tool.id)}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
