
import { initializeApp } from "firebase/app";
import {getFirestore}from 'firebase/firestore' 
import {getAuth} from 'firebase/auth';
 
const firebaseConfig = {
  apiKey: "AIzaSyAukKPz452FilOyueEeRLLslcuXR6Pq0Sg",
  authDomain: "firestore-app-6.firebaseapp.com",
  projectId: "firestore-app-6",
  storageBucket: "firestore-app-6.appspot.com",
  messagingSenderId: "356353949059",
  appId: "1:356353949059:web:afadfa6cdd83a79ccecab6",
  measurementId: "G-5TFVN0EN4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

export {app,auth,db}