// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
initializeApp(firebaseConfig);
const db = getFirestore()
// export default db

export { db, auth };