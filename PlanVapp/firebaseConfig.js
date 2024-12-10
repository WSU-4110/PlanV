// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3HTdqFf7bG25ZhG63qf48O5rttJHqtec',
  authDomain: 'planv-19842.firebaseapp.com',
  projectId: 'planv-19842',
  storageBucket: 'planv-19842.appspot.com',
  messagingSenderId: '589435580080',
  appId: '1:589435580080:web:a10938825852bd26001575',
  measurementId: 'G-KBMHSML9HB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
