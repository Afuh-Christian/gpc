import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmeh26DQPgTyDxpgoqqtTf6tyWs3TzFbA',
  authDomain: 'gpc21-ff35e.firebaseapp.com',
  projectId: 'gpc21-ff35e',
  storageBucket: 'gpc21-ff35e.firebasestorage.app',
  messagingSenderId: '121504427840',
  appId: '1:121504427840:web:b5d3a57a48792bed5fd4a5',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
