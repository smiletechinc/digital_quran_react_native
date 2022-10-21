// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp, getApps} from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCElGvYE6E_ZnBxH1EecOpETfkVy-xsc-k',
  authDomain: 'digital-quran-e24a5.firebaseapp.com',
  databaseURL: 'https://digital-quran-e24a5.firebaseio.com',
  projectId: 'digital-quran-e24a5',
  storageBucket: 'digital-quran-e24a5.appspot.com',
  messagingSenderId: '795209204198',
  appId: '1:795209204198:web:d784f2f194ab513a691627',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

let app = FirebaseApp ? FirebaseApp() : initializeApp(firebaseConfig);
export default app;
