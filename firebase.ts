import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUe3kPqL2DqMiGrdSHzvPEt8LrE0Ud_qg",
  authDomain: "test-sign-a0924.firebaseapp.com",
  projectId: "test-sign-a0924",
  storageBucket: "test-sign-a0924.firebasestorage.app",
  messagingSenderId: "954941952392",
  appId: "1:954941952392:web:2bd0018309cb5c510c2a3d",
  measurementId: "G-04LQBHWZ0F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);