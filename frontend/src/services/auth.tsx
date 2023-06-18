import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Player from "./Player";

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

export const login = async function (
  email: string,
  password: string,
  userNumber: number
): Promise<any> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const player = Player.createPlayer(userNumber, email);
    localStorage.setItem(
      `player${userNumber}Data`,
      JSON.stringify(player.props)
    );
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
};

export const registration = async function (
  email: string,
  password: string
): Promise<any> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
};

export const logOut = async function (userNumber: number): Promise<void> {
  await signOut(auth);
  localStorage.removeItem(`player${userNumber}Data`);
};
