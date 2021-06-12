import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAUdP_lqRUCdo1GdqBiEPnQKXkLEMt8j3k",
    authDomain: "photo-mart.firebaseapp.com",
    projectId: "photo-mart",
    storageBucket: "photo-mart.appspot.com",
    messagingSenderId: "557704000447",
    appId: "1:557704000447:web:f97278491bffb6a040e70a"
};
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();
export const auth = fire.auth();
export default db;