const firebaseConfig = {
    apiKey: "AIzaSyDUi98TVTkr1rcXfE8tqT8onQbhxbVldvg",
    authDomain: "e-commerce-admin-panel-2650f.firebaseapp.com",
    databaseURL: "https://e-commerce-admin-panel-2650f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "e-commerce-admin-panel-2650f",
    storageBucket: "e-commerce-admin-panel-2650f.firebasestorage.app",
    messagingSenderId: "581572059753",
    appId: "1:581572059753:web:dd945c7a57becb734338f8"
};
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
