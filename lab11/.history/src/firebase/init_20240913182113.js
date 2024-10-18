import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from 'firebase/firestore'
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
initializeApp(firebaseConfig)
const db = getFirestore()
export default db


