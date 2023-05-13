// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkeox1FSmLmsUNf-fxqKiRGD788f8Z4lw",
  authDomain: "hotelweb-c97f0.firebaseapp.com",
  projectId: "hotelweb-c97f0",
  storageBucket: "hotelweb-c97f0.appspot.com",
  messagingSenderId: "556773562697",
  appId: "1:556773562697:web:771c23128dddf4b3f56298",
  measurementId: "G-XKZRLY1ZYP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);


export const call = name => {
  return httpsCallable(functions, name)
}