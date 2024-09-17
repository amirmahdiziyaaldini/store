import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAt5zH6ZBFcluotJ_HHl9J0cHtIlPvpYDY',
	authDomain: 'store-4eed2.firebaseapp.com',
	projectId: 'store-4eed2',
	storageBucket: 'store-4eed2.appspot.com',
	messagingSenderId: '45836120594',
	appId: '1:45836120594:web:af329245e69cef7480decb',
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const authFirebase = getAuth(appFirebase); 

export const db = getFirestore(appFirebase)
export const storage = getStorage(appFirebase);

export default appFirebase;