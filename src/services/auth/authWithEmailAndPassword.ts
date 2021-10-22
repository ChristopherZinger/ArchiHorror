import '../firebase/createFirebaseApp';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, User } from 'firebase/auth';

class AuthWithEmailAndPassword {
  auth: Auth;

  constructor () {
    this.auth = getAuth();
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

  public async signin (email: string, password: string): Promise<User>  {
    try{
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (err) {
      console.warn(err.code);
      console.warn(err.message);
      return null
    }
  }

  public async createUserAndSignin (email: string, password: string): Promise<User> {
    try {
      await this.createUser(email, password);
      return await this.signin(email, password);
    } catch (error) {
      console.warn(error.code)
      console.warn(error.message)
      return null;
    }
  }
}

export const authWithEmailAndPassword = new AuthWithEmailAndPassword();

