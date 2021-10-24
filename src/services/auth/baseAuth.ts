import { firebaseApp } from '../firebase/createFirebaseApp';
import { signOut, getAuth, User } from 'firebase/auth'
import { userStore } from '../../stores/auth';

export class BaseAuth {
  auth;

  constructor () {
    const app = firebaseApp.getApp();
    this.auth = getAuth(app);
  } 

  public async signout () {
    await signOut(this.auth);
    userStore.set(null);
  }

  public updateUserStoreWithUserObjFromBackend (user: User) {
    userStore.set(user);
  }
}