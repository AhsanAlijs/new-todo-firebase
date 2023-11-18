import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.addEventListener('submit', (e) => {
  e.preventDefault()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      addDoc(collection(db, "users"), {
        username: username.value,
        email: email.value,
        password: password.value,
        uid:user.uid
      })
        .then((res) => {
          console.log(res);
          window.location = "./login.html"
        }).catch((err) => {
          console.log(err);

        })
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);

    });

})

