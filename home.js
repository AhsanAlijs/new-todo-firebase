import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, addDoc, doc, getDocs, Timestamp, query, orderBy, deleteDoc, updateDoc, where } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { auth, db } from './config.js'
const logout = document.querySelector('#signOut');
const names = document.querySelector('#name');
const form = document.querySelector('#form');
const todo = document.querySelector('#todo');
const card = document.querySelector('#card');
const dels = document.querySelector('#delete')
const update = document.querySelector('#update')




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
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    // console.log(uid);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      // console.log('doc' + "==>" + doc.id);
      // console.log(uid);
      const obj = doc.data();
      names.innerHTML = `${obj.username}`
    });
    
    
  } else {
    
  }
});

// get data from fire store end


// render post start
let arr=[];

function renderPost() {
  card.innerHTML = ''
  arr.map((item) => {
    // console.log(item);
    const time = item.postDate.seconds
    const mydate = new Date(time*1000)
    // console.log(mydate);
      card.innerHTML += `
      <div class="card mt-2 w-[70%] bg-[#1a2930] py-2">
      <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
          <p class="text-[#fff]"><span class="h4 px-2">Todo:</span>${item.todo}</p>
          <p class="text-[#fff] fs-6"><span class=" fs-6 px-2">Date:</span>${mydate}</p>
          </div>
          <div class="mt-[50px] gap-6">
          <button type="button" id="delete" class="btn btn-danger text-[#ffffff]">Delete</button>
          <button type="button" id="update" class="btn btn-info  text-[#ffffff]">Edit</button>
          </div>
      </div>
  </div>`
  })}
  renderPost()
// render post end

// delete start

// delete end




// get data from fire store2 
async function getdatfromfirestore() {
  const q = query(collection(db, "posts"), orderBy('postDate', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    arr.push({ ...doc.data(), docId: doc.id })
  });
  // console.log(arr);
  renderPost();
}
getdatfromfirestore()
// get data from fire end2 


// todo add in firestore start
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (todo.value === '') {
    alert('Enter Todo')
  } else {
    try {
      const postObj = {
        todo: todo.value,
        uid: auth.currentUser.uid,
        postDate: Timestamp.fromDate(new Date())
      }
      const docRef = await addDoc(collection(db, "posts"), postObj);
      console.log("Document written with ID: ", docRef.id);
      postObj.docId = docRef.id;
      arr = [postObj];
      // console.log(arr);


    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
});
// todo add in firestore end

