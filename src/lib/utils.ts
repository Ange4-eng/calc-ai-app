import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAIFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    if (errorMessage.includes("api key not valid")) {
      return "La clé API de Google AI est invalide ou manquante. Veuillez l'ajouter à votre fichier .env comme expliqué dans le README.md.";
    }
    if (errorMessage.includes("deadline exceeded")) {
      return "La requête vers l'IA a pris trop de temps (timeout). Veuillez réessayer."
    }
    // A generic catch-all for other Google AI errors
    if (errorMessage.includes("google") || errorMessage.includes("genkit")) {
      return `Une erreur de l'IA est survenue. Détails : ${error.message}`;
    }
    return `Une erreur inattendue est survenue: ${error.message}`;
  }
  return "Une erreur inattendue est survenue.";
}
