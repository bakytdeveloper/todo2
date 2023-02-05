// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpGgc2xd0m6YddmoCnzgfgMNUwiJTaWkI",
    authDomain: "todo2-a2a90.firebaseapp.com",
    projectId: "todo2-a2a90",
    storageBucket: "todo2-a2a90.appspot.com",
    messagingSenderId: "745860404509",
    appId: "1:745860404509:web:e16a64cb4b71dd17eefdf4"
};

// Initialize Firebase
const connectFirebase = initializeApp(firebaseConfig);
const db = getFirestore(connectFirebase);

export default db;