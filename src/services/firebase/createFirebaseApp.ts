import { authWithEmailAndPassword } from './../auth/authWithEmailAndPassword';
import firebase  from 'firebase/compat/app';
import { getAuth, onAuthStateChanged, Auth }  from 'firebase/auth';
import config from './config';

class FirebaseInitializator {
  auth: Auth;

  constructor () {
    this.initializeFirebaseApp();
    this.auth = getAuth();
    this.initializeFirebaseEventListeners();
  }

  private initializeFirebaseApp () {
    firebase.initializeApp(config);
  }

  initializeFirebaseEventListeners () {
    onAuthStateChanged(this.auth, user => {
      authWithEmailAndPassword.updateUserStoreWithUserObjFromBackend(user);
    });   
  }
}

new FirebaseInitializator();