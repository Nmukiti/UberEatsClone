import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCSMTRg3dalu1xNeTmqzXxHEUrOFBFKu90",
    authDomain: "rn-ubereats-clone.firebaseapp.com",
    projectId: "rn-ubereats-clone",
    storageBucket: "rn-ubereats-clone.appspot.com",
    messagingSenderId: "258058410181",
    appId: "1:258058410181:web:5269bb591df7f38cccb8ac",
    measurementId: "G-EFH17NCNJF"
  };

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  export default firebase;