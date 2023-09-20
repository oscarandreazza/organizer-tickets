import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDVg4XgI8IKNuVNLDwbN6uhl7TkIWk--8E",
    authDomain: "sistema-9db78.firebaseapp.com",
    projectId: "sistema-9db78",
    storageBucket: "sistema-9db78.appspot.com",
    messagingSenderId: "660682661278",
    appId: "1:660682661278:web:bd99e3ff27de504f624a8f",
    measurementId: "G-7W0SS1E919"
};

// Initialize Firebase database + auth
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, storage };
