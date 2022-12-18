// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfUeZDIc_-0FlvLKVBovBx9qmb9ug4n2o",
  authDomain: "insync-8dabb.firebaseapp.com",
  projectId: "insync-8dabb",
  storageBucket: "insync-8dabb.appspot.com",
  messagingSenderId: "595301102217",
  appId: "1:595301102217:web:54e4f4fe0b3dcf42c74c58",
  measurementId: "G-43146HMFTQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()