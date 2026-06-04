import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration (REPLACE WITH YOUR ACTUAL CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyAAHfe3Wdt5KH5s86PUXhzOMhyYoC3FrZE",
  authDomain: "clothing-dark-auth.firebaseapp.com",
  projectId: "clothing-dark-auth",
  storageBucket: "clothing-dark-auth.firebasestorage.app",
  messagingSenderId: "430537616958",
  appId: "1:430537616958:web:0cbf3b62441c8804b62b6f",
  measurementId: "G-HZE25C95V1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signupWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const updateUserProfileData = async (user, profileData) => {
  try {
    await updateProfile(user, {
      displayName: profileData.displayName || user.displayName,
      photoURL: profileData.photoURL || user.photoURL
    });
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};