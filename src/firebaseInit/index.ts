//firebase 初始化
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseInit = (): void => {
  const firebaseConfig = {
    apiKey: "AIzaSyBNfijGfAXgdPPGk8-WxMPUs6RIyFyMgco",
    authDomain: "todo-1a33d.firebaseapp.com",
    projectId: "todo-1a33d",
    storageBucket: "todo-1a33d.appspot.com",
    messagingSenderId: "319278427397",
    appId: "1:319278427397:web:182d853abf475bb5b05b6c",
    measurementId: "G-KLGGJ1CM4L",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
};

export default firebaseInit;
