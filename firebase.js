// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD0oYGC8BViT7tGyZB_6J0XCJqdhQWPZ-k",
  authDomain: "selfcareapp-7941a.firebaseapp.com",
  projectId: "selfcareapp-7941a",
  storageBucket: "selfcareapp-7941a.appspot.com",
  messagingSenderId: "535391520979",
  appId: "1:535391520979:web:2578f0d96fd45872a6ac26"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
export default app;