import { initializeApp } from 'firebase/app';
import { getAuth, Auth }  from 'firebase/auth';
import config from './config';

class FirebaseApp {
  auth: Auth;
  app;

  constructor () {
    this.app = initializeApp(config);
    this.auth = getAuth();
  }
}

export const firebaseApp = new FirebaseApp();

