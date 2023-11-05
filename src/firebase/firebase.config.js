// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7FS6yDuiUaZdUtyDXYwRHaVEyKJvzL1w",
  authDomain: "job-hunt-application.firebaseapp.com",
  projectId: "job-hunt-application",
  storageBucket: "job-hunt-application.appspot.com",
  messagingSenderId: "1043801711247",
  appId: "1:1043801711247:web:e1a633cc3f95ab1a3046fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)