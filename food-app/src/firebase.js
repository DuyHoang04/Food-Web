import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBs6Wariu7cPCs_VHvVVxl172oxnD-PL1Q",
  authDomain: "food-app-5e5e8.firebaseapp.com",
  databaseURL: "https://food-app-5e5e8-default-rtdb.firebaseio.com",
  projectId: "food-app-5e5e8",
  storageBucket: "food-app-5e5e8.appspot.com",
  messagingSenderId: "380362460924",
  appId: "1:380362460924:web:0a6027a4e758b36c72d179",
  measurementId: "G-RMQC19RXSG",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const database = getFirestore(app);
const storage = getStorage(app);

export { app, database, storage };
