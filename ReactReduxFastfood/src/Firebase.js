import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCTSrtpza1D_7tv0w82CV6cd6bqMabvGb8',
  authDomain: 'test-po4erk.firebaseapp.com',
  databaseURL: 'https://test-po4erk.firebaseio.com',
  projectId: 'test-po4erk',
  storageBucket: 'test-po4erk.appspot.com',
  messagingSenderId: '950069581603',
};
firebase.initializeApp(config);

export const database = firebase.database().ref('Fastfoods/');
export const storage = firebase.storage();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

