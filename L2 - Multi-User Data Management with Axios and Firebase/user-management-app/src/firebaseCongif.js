import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBhEbTudc5YUgGKydytgmMV38yvP45eans",
  authDomain: "user-management-system-a7252.firebaseapp.com",
  databaseURL: "https://user-management-system-a7252-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "user-management-system-a7252",
  storageBucket: "user-management-system-a7252.firebasestorage.app",
  messagingSenderId: "658906899904",
  appId: "1:658906899904:web:dc95373748942a10215425"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const writeUserData = (userId, name, email) => {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email
  });
};

const fetchUserData = (userId) => {
  const dbRef = ref(database);
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
