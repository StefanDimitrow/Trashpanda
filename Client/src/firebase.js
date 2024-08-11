import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx30KvdtSdyd70E5pGQYlfz_R5fQtXY2k",
  authDomain: "trashpanda-8ff4f.firebaseapp.com",
  projectId: "trashpanda-8ff4f",
  storageBucket: "trashpanda-8ff4f.appspot.com",
  messagingSenderId: "265912380944",
  appId: "1:265912380944:web:7e4631837d385de4bce495",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
