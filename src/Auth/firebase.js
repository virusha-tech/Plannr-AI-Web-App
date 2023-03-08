import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfLK2s8KQhx4wQe-7DNZz55Yt5giHUVsk",
  authDomain: "plannr-ai.firebaseapp.com",
  projectId: "plannr-ai",
  storageBucket: "plannr-ai.appspot.com",
  messagingSenderId: "655920401346",
  appId: "1:655920401346:web:b135df950a3e8b5ee5245b",
  measurementId: "G-ZDKMEZQ9P6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(app);
