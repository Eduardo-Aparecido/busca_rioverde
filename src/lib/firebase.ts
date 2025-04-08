// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // 👈 novo

const firebaseConfig = {
  apiKey: "AIzaSyDaj5FV-dy83IGZ0gwXqr9G8ybtcesHmf4",
  authDomain: "routis-c8afa.firebaseapp.com",
  projectId: "routis-c8afa",
  storageBucket: "routis-c8afa.appspot.com",
  messagingSenderId: "752635979616",
  appId: "1:752635979616:web:02faccde4e01677f07a005",
  measurementId: "G-QHM1FD49Z8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // 👈 novo

export { db, auth, storage };
