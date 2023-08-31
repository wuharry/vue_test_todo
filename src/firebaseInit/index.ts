//firebase 初始化
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBNfijGfAXgdPPGk8-WxMPUs6RIyFyMgco",
    authDomain: "todo-1a33d.firebaseapp.com",
    databaseURL:
      "https://todo-1a33d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-1a33d",
    storageBucket: "todo-1a33d.appspot.com",
    messagingSenderId: "319278427397",
    appId: "1:319278427397:web:182d853abf475bb5b05b6c",
    measurementId: "G-KLGGJ1CM4L",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
    return { app, analytics };
};

// Initialize Firebase


export { firebaseInit };
