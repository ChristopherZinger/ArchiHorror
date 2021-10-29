import { firebaseApp } from '../firebase/createFirebaseApp';
import { signOut, getAuth, User } from 'firebase/auth'
import { userStore } from '../../stores/auth';

export abstract class AbstractBaseAuth {
  auth;

  constructor () {
    const app = firebaseApp.getApp();
    this.auth = getAuth(app);
  } 

  public abstract createUserAndSignin (email: string, password: string)
  public abstract signin (email: string, password: string)

  public async signout () {
    await signOut(this.auth);
    userStore.set(null);
  }

  public updateUserStoreWithUserObjFromBackend (user: User) {
    userStore.set(user);
  }
}