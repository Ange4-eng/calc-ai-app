// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isFirebaseConfigured = false;

// Only attempt to initialize if the essential keys are not only present, but non-empty.
if (firebaseConfig.apiKey && firebaseConfig.authDomain) {
    isFirebaseConfigured = true;
    try {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (error) {
        console.error("Firebase initialization error. Your API keys may be incorrect. Disabling authentication features.", error);
        // If initialization fails, revert to unconfigured state
        app = null;
        auth = null;
        db = null;
        isFirebaseConfigured = false;
    }
} else {
    // This message will appear in your server logs if keys are missing
    console.log("Firebase configuration is missing. Authentication features are disabled.");
}

export { app, auth, db, isFirebaseConfigured };
