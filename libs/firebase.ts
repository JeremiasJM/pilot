// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsUT_6VL9il8RmBr2a_rrdy7Dni_xdt1Q",
  authDomain: "pilot-acf1b.firebaseapp.com",
  projectId: "pilot-acf1b",
  storageBucket: "pilot-acf1b.appspot.com",
  messagingSenderId: "564710171016",
  appId: "1:564710171016:web:5536205a40896dbb905a3d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp