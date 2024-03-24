import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging'; // Import Firebase messaging module

const firebaseConfig = {
    apiKey: 'AIzaSyCt0I1nxsIXKJ_9TEAdVX7CvJbtOttUIsE',
    authDomain: 'diasgame-4cac1.firebaseapp.com',
    projectId: 'diasgame-4cac1',
    storageBucket: 'diasgame-4cac1.appspot.com',
    messagingSenderId: '95926312660',
    appId: '1:95926312660:web:122b7058699898ecd6a541',
    measurementId: 'G-MHW6C1RVB6'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app); // Initialize Firebase messaging

export { app, db, messaging };
