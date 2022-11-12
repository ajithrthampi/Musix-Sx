import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAyREbfXckvIZGmsO-W0i9PSmGXZzenldc",
    authDomain: "musicsx-df35a.firebaseapp.com",
    projectId: "musicsx-df35a",
    storageBucket: "musicsx-df35a.appspot.com",
    messagingSenderId: "129759807924",
    appId: "1:129759807924:web:e513becd198d03e4e94ae1",
    measurementId: "G-BDFDWKV0J6"
  };

// Initialize Firebase

const app =initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
