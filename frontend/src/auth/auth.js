import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCyPmaaXIjkFtGVPoTt79f1z9fwbyKR9Oo",
 authDomain: "react-five-in-a-row.firebaseapp.com",
 projectId: "react-five-in-a-row",
 storageBucket: "react-five-in-a-row.appspot.com",
 messagingSenderId: "965919830164",
 appId: "1:965919830164:web:5fad89b6e9fd6cce174481"
};

const app = initializeApp(firebaseConfig);

export const login = function (email, password) {
 const auth = getAuth();
 return signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     const user = userCredential.user;
     console.log(user);
     return user;
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log(errorCode, errorMessage);
   });
};

export const registration = function (email, password) {
 const auth = getAuth();
 return createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     const user = userCredential.user;
     console.log(user);
     return user;
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log(errorCode, errorMessage);
   });
};

export const logOut = async function () {
 const auth = getAuth();
 await signOut(auth);
};