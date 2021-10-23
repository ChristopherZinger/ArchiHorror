import { signOut, getAuth, User } from 'firebase/auth'
import { userStore } from '../../stores/auth';

export class BaseAuth {
  auth;

  constructor () {
    this.auth = getAuth();
  } 

  public async signout () {
    await signOut(this.auth);
    userStore.set(null);
  }

  public updateUserStoreWithUserObjFromBackend (user: User) {
    userStore.set(user);
  }
}