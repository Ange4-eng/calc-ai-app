"use client";

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Sparkles, User as UserIcon, LogOut, AlertTriangle, Crown, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function UserAuthButton() {
  const { user, loading, isConfigured, isPro, signInWithGoogle, logout } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast } = useToast();

  const handleProClick = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Connexion requise',
        description: 'Vous devez être connecté pour passer à Pro.',
      });
      return;
    }
    
    const portalUrl = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;
    const priceId = process.env.STRIPE_PRICE_ID;

    // If user is already pro, redirect to customer portal
    if (isPro) {
        if (portalUrl) {
            window.location.href = portalUrl;
        } else {
            toast({
                variant: 'destructive',
                title: 'Portail non configuré',
                description: 'Le portail de gestion de l\'abonnement n\'est pas configuré dans le fichier .env.'
            });
        }
        return;
    }
    
    // Check if Stripe is configured before attempting to create a checkout session
    if (!priceId) {
        toast({
            variant: 'destructive',
            title: 'Paiements non configurés',
            description: 'L\'administrateur n\'a pas encore configuré Stripe. Veuillez consulter le README.md.'
        });
        return;
    }
    
    setIsRedirecting(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      });

      const jsonResponse = await response.json();
      if (!response.ok) {
        throw new Error(jsonResponse.error || 'Failed to create checkout session');
      }

      if (jsonResponse.url) {
        window.location.href = jsonResponse.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: (error as Error).message || "Impossible de lancer le paiement. Veuillez réessayer plus tard."
      });
    } finally {
        setIsRedirecting(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="flex items-center gap-2">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" disabled className="text-destructive border-destructive/50 cursor-not-allowed">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Auth non configuré
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Veuillez ajouter vos clés Firebase API au fichier .env pour activer la connexion.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  if (loading) {
    return <Button variant="ghost" size="icon" disabled><Loader2 className="h-4 w-4 animate-spin" /></Button>;
  }

  if (!user) {
    return <Button onClick={signInWithGoogle}>Connexion</Button>;
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'Avatar'} />
              <AvatarFallback>
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon />}
              </AvatarFallback>
            </Avatar>
            {isPro && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
           <DropdownMenuGroup>
             <DropdownMenuItem onClick={handleProClick} disabled={isRedirecting}>
              {isRedirecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isPro ? <Settings className="mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />)}
              <span>{isPro ? "Gérer l'abonnement" : "Passer à Pro"}</span>
            </DropdownMenuItem>
           </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
