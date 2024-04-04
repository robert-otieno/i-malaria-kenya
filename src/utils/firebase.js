// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7SPISQXSEGgkNHV-BuvJwXfetMwxZUAM",
  authDomain: "i-malaria-kenya.firebaseapp.com",
  projectId: "i-malaria-kenya",
  storageBucket: "i-malaria-kenya.appspot.com",
  messagingSenderId: "140396021782",
  appId: "1:140396021782:web:04c45e2f80e2dc07744d37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
