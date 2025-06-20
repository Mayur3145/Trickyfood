import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeInRube2vjTuhuBd90W_5hkjtbO4SUvY",
  authDomain: "trickyfood-85750.firebaseapp.com",
  projectId: "trickyfood-85750",
  storageBucket: "trickyfood-85750.firebasestorage.app",
  messagingSenderId: "199156472646",
  appId: "1:199156472646:web:917f504bbd364757286347",
  measurementId: "G-NK0L2558E1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);