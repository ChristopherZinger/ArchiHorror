import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { AbstractBaseAuth } from './baseAuth';
import { db } from '../firebase/connectToFirebaseDB';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';


class AuthWithEmailAndPassword extends AbstractBaseAuth {
  db;
  userCollection;

  constructor () {
    super();

    this.db = db;
    this.userCollection = 'users';
  }

  public async createUserAndSignin (email: string, password: string): Promise<void> {
    try {
      const authUser = await this.createUser(email, password);
      await this.addUserToUsersCollection(authUser.uid)
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
      return user;
    } catch (error) {
      console.warn(error.code)
      console.log(error.message);
      return null;
    }
  }

  private async addUserToUsersCollection (userId: string) {
    try{
      return await setDoc(doc(this.db, 'users', userId), {
        roles: ['basic_user'],
        createdAt: serverTimestamp(),
      });
    } catch (err) {

    }
  }

  public async signin (email: string, password: string): Promise<void> {
    const user = await this.signinWithFirebase(email, password);
    // TODO add cloud function that will check if user has a record in users collection,
    // TODO and if not adds it.
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

