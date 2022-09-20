import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcTTjn9hZH8A_-KAQk_gYD9Suj2DQa4xg",
  authDomain: "crwn-clothing-db-c9720.firebaseapp.com",
  projectId: "crwn-clothing-db-c9720",
  storageBucket: "crwn-clothing-db-c9720.appspot.com",
  messagingSenderId: "268167124532",
  appId: "1:268167124532:web:7f361fdb7693d3637a1c61",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
const userDocRef = doc(db, "users", userAuth.uid);

// console.log(userDocRef);

const userSnapshot = await getDoc(userDocRef);
// console.log(userSnapshot);
// console.log(userSnapshot.exists());

if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        });
    } catch (error) {
        console.log("error creating user", error.message);
}
}

return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}