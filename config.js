import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCScDar_TH1NLLzYrE2mXU65quG9VkhKiY",
    authDomain: "ahsan-todoapp.firebaseapp.com",
    projectId: "ahsan-todoapp",
    storageBucket: "ahsan-todoapp.appspot.com",
    messagingSenderId: "580190992553",
    appId: "1:580190992553:web:9637442c4408538eb0d1b8",
    measurementId: "G-QRR0DBMMP6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)