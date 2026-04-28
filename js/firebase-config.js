import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdmZI1Gso0XmWWMdUWbLzunhmCorvLKAc",
  authDomain: "rvacademy-0.firebaseapp.com",
  projectId: "rvacademy-0",
  storageBucket: "rvacademy-0.firebasestorage.app",
  messagingSenderId: "56779915896",
  appId: "1:56779915896:web:2dd1a3280e3a6e1efc238d",
  measurementId: "G-S2JY7YKKGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
