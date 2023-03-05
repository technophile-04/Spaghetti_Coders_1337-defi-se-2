// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC1NeePMUmgYdtA2ea6YHLjX8DBEIwwJkA",
  authDomain: "coc-blockchain-2b580.firebaseapp.com",
  databaseURL: "https://coc-blockchain-2b580-default-rtdb.firebaseio.com",
  projectId: "coc-blockchain-2b580",
  storageBucket: "coc-blockchain-2b580.appspot.com",
  messagingSenderId: "1063665200098",
  appId: "1:1063665200098:web:5f29fe581728b7752aa7bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // contains firestore database service
