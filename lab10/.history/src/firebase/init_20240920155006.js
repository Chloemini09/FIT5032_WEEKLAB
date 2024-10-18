import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCt5f-BeIRtGYUf-aR-GNC_zkKUsHN3-8s",
  authDomain: "fit5032-a2-8cff6.firebaseapp.com",
  projectId: "fit5032-a2-8cff6",
  storageBucket: "fit5032-a2-8cff6.appspot.com",
  messagingSenderId: "870583972630",
  appId: "1:870583972630:web:70fa5ed6ffd68edf471637",
  measurementId: "G-8Z4XEG8R1F"
};
// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db



