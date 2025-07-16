
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured, db } from '@/lib/firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  isPro: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (!auth || !db) {
        setLoading(false);
        return;
    }
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        // Not logged in
        setIsPro(false);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user && db) {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
            const data = doc.data();
            setIsPro(data?.isPro === true);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user data:", error);
            setIsPro(false);
            setLoading(false);
        });
        return () => unsubscribeFirestore();
    } else {
        // Ensure loading is false if there's no user
        setLoading(false);
    }
  }, [user]);

  const signInWithGoogle = async () => {
    if (!auth) {
        console.error("Firebase is not configured. Cannot sign in.");
        return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle the user state update
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const logout = async () => {
    if (!auth) {
        console.error("Firebase is not configured. Cannot sign out.");
        return;
    }
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will handle the user state update
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const value = { user, loading, isConfigured: isFirebaseConfigured, isPro, signInWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
