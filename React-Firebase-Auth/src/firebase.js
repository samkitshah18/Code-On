import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";


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
const db = getFirestore();
const auth = getAuth();

export function signup(email, password, name) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function addUser(email, password, name) {

  const user = doc(db, `users/${email}`)
  async function createUser() {
    const docData = {
      name: name,
      email: email,
      password: password
    };
    const res = await setDoc(user, docData);
    return res
  }
  const resp = createUser();
  return resp
}
// addDoc(collection(db, "users/yashpatel"), {
//   name: name,
//   email: email,
//   password: password
// });

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export function createFile(email, codeText, fileName) {
  const script = doc(db, `users/${email}/scripts/${fileName}`)
  async function createFile() {
    const docData = {
      code: codeText,
      fileName: fileName
    };
    setDoc(script, docData);
  }
  createFile();
}

export function fetchFile(email, fileName) {
  const docRef = doc(db, `users/${email}/scripts/${fileName}`)
  const docSnap = getDoc(docRef);
  return docSnap
}

export async function getallDocs(email) {
  let arr = []
  const querySnapshot = await getDocs(collection(db, `users/${email}/scripts`));
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr = [...arr, { name: doc.id, code: doc.data().code }]
    // console.log(doc.id, " => ", doc.data());
  });
  console.log(arr);
  return arr;
}

export function getInfo() {
  let user = getAuth().currentUser
  console.log("current user", user)
  return user.email;
}


export function deleteFile(email, fileName) {
  console.log("filename", fileName)
  try {
    const script = doc(db, `users/${email}/scripts/${fileName}`)
    console.log(deleteDoc(script));
  }
  catch (e) {
    console.log(e, "errrr")
  }
}

