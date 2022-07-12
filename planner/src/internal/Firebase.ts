import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyBN2Cut6b_wizHxxnPKfgEieOeAppmJVqI',
	authDomain: 'planifico-49309.firebaseapp.com',
	projectId: 'planifico-49309',
	storageBucket: 'planifico-49309.appspot.com',
	messagingSenderId: '196904366932',
	appId: '1:196904366932:web:55e80f928e5587d7828ec1',
	measurementId: 'G-2RY2WVB56V'
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
