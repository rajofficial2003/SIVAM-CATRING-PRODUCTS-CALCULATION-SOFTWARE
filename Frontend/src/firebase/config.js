import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA0Jy-9hoBIt6y4FO4I9jjhrKHVLu5My04",
  authDomain: "sivam-catring.firebaseapp.com",
  projectId: "sivam-catring",
  storageBucket: "sivam-catring.firebasestorage.app",
  messagingSenderId: "1095714922543",
  appId: "1:1095714922543:web:e1bb9b2ac556e80323a6da",
  measurementId: "G-NL4603EWVT",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Firebase Authentication
const auth = getAuth(app)

// Initialize Firebase Storage
const storage = getStorage(app)

export { app, db, auth, storage }

