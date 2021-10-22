import '../firebase/createFirebaseApp';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, User } from 'firebase/auth';
import { userStore } from '../../stores/auth';

class AuthWithEmailAndPassword {
  auth: Auth;

  constructor () {
    this.auth = getAuth();
  }

  public async createUserAndSignin (email: string, password: string): Promise<void> {
    try {
      await this.createUser(email, password);
      await this.signin(email, password);
    } catch (error) {
      console.warn(error.code)
      console.warn(error.message)
      return null;
    }
  }

  private async createUser (email: string, password: string): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password)
      return user
    } catch (error) {
      console.warn(error.code)
      console.log(error.message);
      return null;
    }
  }

  public async signin (email: string, password: string): Promise<void> {
    await this.signinAndSetUserInStore(email, password);
  }

  private async signinAndSetUserInStore (email: string, password: string): Promise<void> {
    const user = await this.signinWithFirebase(email, password);
    await this.updateUserStoreWithUserObjFromFirebase(user); 
  }

  private async signinWithFirebase (email: string, password: string): Promise<User>  {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password)
      return user;
    } catch (error) {
        console.warn(error.code);
        console.warn(error.message);
    }
  }

  private updateUserStoreWithUserObjFromFirebase (userObjFromFirebase) {
    console.log(userObjFromFirebase, userStore);
    userStore.set(userObjFromFirebase);
  }
}

export const authWithEmailAndPassword = new AuthWithEmailAndPassword();

