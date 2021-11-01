import firebase  from 'firebase/compat/app';
import { getAuth, Auth }  from 'firebase/auth';
import config from './config';

class FirebaseApp {
  auth: Auth;
  app;

  constructor () {
    this.app = this.initializeFirebaseApp();
    this.auth = getAuth();
  }

  private initializeFirebaseApp () {
    return firebase.initializeApp(config);
  }

  public getApp () {
    return this.app;
  }
}

export const firebaseApp = new FirebaseApp();

