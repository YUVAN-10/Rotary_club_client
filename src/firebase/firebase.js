import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEoP5c0IMv6VscSQ9-jKWwo6w-6BVN4js",
  authDomain: "rotary-central.firebaseapp.com",
  projectId: "rotary-central",
  storageBucket: "rotary-central.firebasestorage.app",
  messagingSenderId: "699965210773",
  appId: "1:699965210773:web:de5b7ddbb60f932add1b9c",
  measurementId: "G-ERTXPESVDP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
