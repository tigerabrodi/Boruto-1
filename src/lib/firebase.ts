import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "boruto-blog.firebaseapp.com",
  projectId: "boruto-blog",
  storageBucket: "boruto-blog.appspot.com",
  messagingSenderId: "680337824952",
  appId: "1:680337824952:web:6b3d1c86e5903f6032284d",
};

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);
const firebaseDb = getFirestore(app);
const firebaseAuth = getAuth(app);

export { firebaseStorage, firebaseDb, firebaseAuth };

export const logOut = () => {
  signOut(firebaseAuth);
};
