import admin from 'firebase-admin';

// This is a server-side only file.

// Check if the service account credentials are provided, otherwise Firebase Admin will not work.
const hasCredentials =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

// Use a private key that is formatted correctly for Firebase Admin SDK
// The key from the .env file might have escaped newlines, so we replace them.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// This function initializes the Firebase Admin SDK.
// It uses a singleton pattern to ensure it's only initialized once.
function initializeAdmin() {
    if (!hasCredentials) {
        console.log('Firebase Admin credentials are not available. Skipping initialization.');
        return null;
    }

    if (admin.apps.length > 0) {
        return admin.app();
    }

    try {
        const adminApp = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey,
            }),
        });
        return adminApp;
    } catch (error) {
        console.error("Firebase Admin initialization error:", error);
        return null;
    }
}

// Initialize the app and export the firestore database instance.
export const adminApp = initializeAdmin();
export const adminDb = adminApp ? admin.firestore() : null;
