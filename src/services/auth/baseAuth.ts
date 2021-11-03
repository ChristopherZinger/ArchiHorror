import { signOut, getAuth, User } from 'firebase/auth'
import { userStore } from '../../stores/auth';


export abstract class AbstractBaseAuth {
  auth;

  constructor () {
    this.auth = getAuth();
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