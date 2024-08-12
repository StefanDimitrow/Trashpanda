// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx30KvdtSdyd70E5pGQYlfz_R5fQtXY2k",
  authDomain: "trashpanda-8ff4f.firebaseapp.com",
  projectId: "trashpanda-8ff4f",
  storageBucket: "trashpanda-8ff4f.appspot.com",
  messagingSenderId: "265912380944",
  appId: "1:265912380944:web:7e4631837d385de4bce495"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth,db,storage };