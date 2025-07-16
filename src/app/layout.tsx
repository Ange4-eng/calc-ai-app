import type {Metadata, Viewport} from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-context';

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "CalcAI : L'Omni-Calculatrice Intelligente propulsée par l'IA",
  description: "CalcAI est une calculatrice tout-en-un révolutionnaire. Résolvez des problèmes, analysez des fonctions, effectuez des calculs financiers, de la trigonométrie, et bien plus, avec des explications pas à pas fournies par l'IA. Idéal pour les élèves, les étudiants et les professionnels.",
  keywords: "calculatrice, calculatrice en ligne, calculatrice IA, solveur de problèmes, mathématiques, algèbre, trigonométrie, calcul, finance, IA, intelligence artificielle, éducation",
  authors: [{ name: "CalcAI Team" }],
  creator: "CalcAI Team",
  publisher: "CalcAI Team",
  manifest: "/manifest.json",
  openGraph: {
      title: "CalcAI : L'Omni-Calculatrice Intelligente",
      description: "La calculatrice tout-en-un qui vous aide à comprendre les mathématiques grâce à l'IA.",
      url: "https://calc-ai-app.vercel.app",
      siteName: 'CalcAI',
      images: [
        {
          url: 'https://placehold.co/1200x630.png',
          width: 1200,
          height: 630,
          alt: 'CalcAI - Omni-Calculatrice Intelligente',
        },
      ],
      locale: 'fr_FR',
      type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: "CalcAI : L'Omni-Calculatrice Intelligente",
    description: 'Résolvez n\'importe quel problème mathématique avec des explications IA. De la calculatrice de base à l\'analyse de fonctions avancées.',
    images: ['https://placehold.co/1200x630.png'],
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${sora.variable} ${inter.variable}`}>
      <head>
        {/* Collez votre balise de vérification Google Search Console ici */}
        <meta name="google-site-verification" content="UEdQzCxFzpL9MrpxXtObnuLf7dv5ABGrwGoskIjGYJQ" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CalcAI" />
        <link rel="apple-touch-icon" href="https://placehold.co/180x180.png" data-ai-hint="logo brain" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
