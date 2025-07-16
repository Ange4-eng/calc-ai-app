"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrimaryLevelPage } from "@/components/primary-level-page";
import { SecondaryLevelPage } from "@/components/secondary-level-page";
import { TertiaryLevelPage } from "@/components/tertiary-level-page";
import { CalculatorIcon, BrainCircuit, GraduationCap } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { UserAuthButton } from "./user-auth-button";
import Link from 'next/link';

export function MainLayout() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-background font-sans text-foreground">
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-wider">
            CalcAI
          </h1>
        </Link>
        <div className="flex items-center gap-2">
            <UserAuthButton />
            <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col overflow-y-auto p-4 md:p-6">
        <Tabs defaultValue="secondary" className="flex w-full flex-1 flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4 h-12">
            <TabsTrigger value="primary">
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Primaire
            </TabsTrigger>
            <TabsTrigger value="secondary">
              <GraduationCap className="mr-2 h-4 w-4" />
              Secondaire
            </TabsTrigger>
            <TabsTrigger value="tertiary">
               <BrainCircuit className="mr-2 h-4 w-4" />
               Tertiaire
            </TabsTrigger>
          </TabsList>
          <TabsContent value="primary" className="flex-1">
            <PrimaryLevelPage />
          </TabsContent>
          <TabsContent value="secondary" className="flex-1">
            <SecondaryLevelPage />
          </TabsContent>
          <TabsContent value="tertiary" className="flex-1">
            <TertiaryLevelPage />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="flex items-center justify-center p-4 border-t text-sm text-muted-foreground">
        <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center">
          <span>© {new Date().getFullYear()} CalcAI</span>
          <Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Conditions d'utilisation</Link>
          <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
          <span>Développé avec ❤️ sur Firebase Studio</span>
        </div>
      </footer>
    </div>
  );
}
