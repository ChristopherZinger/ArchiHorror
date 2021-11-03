import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator }  from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import config from './config';

class FirebaseApp {
  auth: Auth;
  app;
  db;

  constructor () {
    this.app = initializeApp(config);
    this.auth = getAuth();
    this.db = getFirestore();
    this.connectToEmulators();
  }

  private connectToEmulators () {
    connectFirestoreEmulator(this.db, 'localhost', 8080);
    connectAuthEmulator(this.auth, "http://localhost:9099");

    const functions = getFunctions(this.app);
    connectFunctionsEmulator(functions, "localhost", 5001);
  }
}

export const firebaseApp = new FirebaseApp();

