import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiz0z5-WZ8NWN3_aClnBwyCgQyNscSC14",
  authDomain: "codeon-auth.firebaseapp.com",
  projectId: "codeon-auth",
  storageBucket: "codeon-auth.appspot.com",
  messagingSenderId: "752741505776",
  appId: "1:752741505776:web:3b6159adcdb382293e0035"
};

// Initialize Firebase
// eslint-disable-next-line 
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
