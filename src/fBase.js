import {initializeApp} from "firebase/app";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, updateProfile} from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, where, query } from "firebase/firestore";
import {getStorage, ref, uploadString, getDownloadURL, deleteObject} from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

export const firebase = initializeApp(firebaseConfig);

export const authService = getAuth(firebase);
export {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider,signInWithPopup, updateProfile};

export const dbService = getFirestore(firebase);
export {collection, addDoc, getDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, where, query};

export const storageService = getStorage(firebase,"gs://nwitter-1bd70.appspot.com");
export {ref, uploadString, getDownloadURL, deleteObject};