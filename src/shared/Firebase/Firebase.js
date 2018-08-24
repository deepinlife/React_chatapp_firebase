import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDsuyGrYl3ZNAibR7qpOluyktVWWV0N348",
  authDomain: "goalapp-74c1d.firebaseapp.com",
  databaseURL: "https://goalapp-74c1d.firebaseio.com",
  projectId: "goalapp-74c1d",
  storageBucket: "goalapp-74c1d.appspot.com",
  messagingSenderId: "644725805141"
};
const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('SSR');
export default firebaseApp;