import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, getDocs, addDoc,query, orderBy } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { auth, db } from './config.js'
const logout = document.querySelector('#signOut');
const names = document.querySelector('#name');
const form = document.querySelector('#form');
const todo = document.querySelector('#todo');
const arry=[];
// logout button start
logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('sign out success');
        window.location = './login.html'
    }).catch((error) => {
        console.log(error);
    });
})
// logout button end

// get data from fire store start
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    console.log(doc.data());
    console.log(doc.id);
    const obj=doc.data();
    console.log("UID===>" + obj.uid);
    names.innerHTML = `${obj.username}`
});
// get data from fire store end


// get data from fire store2 


// get data from fire end2 

// todo add in firestore start
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, "post"), {
          todo: todo.value,
         
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
})
// todo add in firestore end
