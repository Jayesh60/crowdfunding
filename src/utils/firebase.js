// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8ieVduJmOHhwGvl0ZobeFUM_XNebhtok",
  authDomain: "crowdfunsding.firebaseapp.com",
  projectId: "crowdfunsding",
  storageBucket: "crowdfunsding.appspot.com",
  messagingSenderId: "736541692803",
  appId: "1:736541692803:web:d2ceaa30b8bf151f749cb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
