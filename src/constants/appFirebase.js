import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlGkjP4xAdDqOxND5ppIflzvHzBO0w-qQ",
  authDomain: "thrift-kuy.firebaseapp.com",
  databaseURL: "https://thrift-kuy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thrift-kuy",
  storageBucket: "thrift-kuy.appspot.com",
  messagingSenderId: "1075968114709",
  appId: "1:1075968114709:web:df04b8db323afcac108e1c"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

const FIREBASE = database;

export default FIREBASE;