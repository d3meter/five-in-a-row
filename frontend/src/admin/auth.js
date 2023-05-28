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
  appId: "1:965919830164:web:5fad89b6e9fd6cce174481",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();


export const login = function (email, password, userNumber) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem(`user${userNumber}`, JSON.stringify(user));
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
    });
};

export const registration = function (email, password) {
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
      throw error;
    });
};

export const logOut = async function (userNumber) {
  await signOut(auth);
  localStorage.removeItem(`user${userNumber}`);
  localStorage.removeItem(`player${userNumber}Data`);
  localStorage.removeItem(`player${userNumber}ImgSrc`);
};
