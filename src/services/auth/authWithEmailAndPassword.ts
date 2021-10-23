import '../firebase/createFirebaseApp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { BaseAuth } from './baseAuth';


class AuthWithEmailAndPassword extends BaseAuth {
  constructor () {
    super();
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
    await this.signinWithFirebase(email, password);
  }

  private async signinWithFirebase (email: string, password: string): Promise<void>  {
    try {
      await signInWithEmailAndPassword(this.auth, email, password)
    } catch (error) {
        console.warn(error.code);
        console.warn(error.message);
    }
  }
}

export const authWithEmailAndPassword = new AuthWithEmailAndPassword();

