import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCYsA5MAnP9z_waAXpQnZYhDcB2OQKtu3Q',
  authDomain: 'boris-chat-app.firebaseapp.com',
  databaseURL: 'https://boris-chat-app.firebaseio.com',
  projectId: 'boris-chat-app',
  storageBucket: 'boris-chat-app.appspot.com',
  messagingSenderId: '769527626084'
};
firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase };
