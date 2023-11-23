import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, addDoc, doc, getDocs, Timestamp, query, orderBy, deleteDoc, updateDoc, where } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { auth, db } from './config.js'
const logout = document.querySelector('#signOut');
const names = document.querySelector('#name');
const form = document.querySelector('#form');
const todo = document.querySelector('#todo');
const card = document.querySelector('#card');


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
    getdatfromfirestore(uid)

  } else {

  }
});

// get data from fire store end


// render post start
let arr = [];

function renderPost() {
  card.innerHTML = ''
  arr.map((item) => {
    // console.log(item);
    const time = item.postDate.seconds
    const mydate = new Date(time * 1000)
    // console.log(mydate);
    card.innerHTML += `
      <div class="mt-[10px] bg-[#17242b] rounded-[20px]">
      <div class="card-body p-[20px] ">
          <div class="d-flex align-items-center justify-content-between">
          <p class="text-[#ffffff]"><span class="h4 px-2">Todo:</span>${item.todo}</p>
          <p class="text-[#ffffff]"><span class="h4 px-2"></span>${mydate}</p>
          </div>
          <div class=" gap-6 mt-[20px]">
          <button type="button" id="delete" class="btn btn-danger text-[#ffffff]">Delete</button>
          <button type="button" id="update" class="btn btn-info  text-[#ffffff]">Edit</button>
          </div>
      </div>
  </div>`
  })
  const del = document.querySelectorAll('#delete');
  const upd = document.querySelectorAll('#update')

  // delete function start
  del.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      // console.log('delete', arr[index]);
      await deleteDoc(doc(db, "posts", arr[index].docId))
        .then(() => {
          console.log('post deleted');
          arr.splice(index, 1);
          renderPost()
        });

    })
  })
  // delete function end

  // update function start
  upd.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      // console.log('edit', arr[index]);
      const updatedTodo = prompt('enter new Todo',arr[index].todo);
      await updateDoc(doc(db, "posts", arr[index].docId), {
        todo: updatedTodo
      });
      arr[index].todo = updatedTodo;
      renderPost()
    })
  });
  // update function end
}
renderPost()
// render post end

// get data from fire store2 
async function getdatfromfirestore(uid){
  arr.length = 0;
  const q = await query(collection(db, "posts"), orderBy('postDate', 'desc') , where('uid' , '==' , uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docId: doc.id })
    console.log(doc.data().uid);
  });
  // console.log(arr);
  renderPost();
}
  
getdatfromfirestore()

// get data from fire end2 


// todo add in firestore start
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log();
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
      arr = [postObj,...arr];
      // console.log(arr);
      todo.value=''
      renderPost()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
});
// todo add in firestore end


