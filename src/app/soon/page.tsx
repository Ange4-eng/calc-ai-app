
import { BrainCircuit } from 'lucide-react';

export default function SoonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8 font-sans">
      <div className="text-center space-y-6">
        <BrainCircuit className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-5xl font-bold tracking-tight">
          Calc<span className="text-primary">AI</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          L'Omni-Calculatrice.
        </p>
        <p className="text-2xl font-semibold animate-pulse pt-8">
          Bientôt disponible.
        </p>
      </div>
    </main>
  );
}
