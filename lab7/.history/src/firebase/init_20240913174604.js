// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';  // Import getFirestore for Firestore
import { getAuth } from 'firebase/auth';  // Import getAuth for Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqfigvQiJbcdu2h4yEhtTyAScu6E0qUg4",
  authDomain: "week7-jxy.firebaseapp.com",
  projectId: "week7-jxy",
  storageBucket: "week7-jxy.appspot.com",
  messagingSenderId: "337741615384",
  appId: "1:337741615384:web:4e35d22e80321f1c13ce6d",
  measurementId: "G-SZ90GZXZWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore
const auth = getAuth(app);  // Initialize Firebase Authentication

// Export the services for use in your app
export { db, auth };
