import { getAuth, Auth, onAuthStateChanged } from 'firebase/auth';
import { authWithEmailAndPassword } from './../auth/authWithEmailAndPassword';

class FirebaseEvents {
  auth: Auth;

  constructor () {
    this.auth = getAuth();
    this.initializeFirebaseEventListeners();
  }

  private initializeFirebaseEventListeners () {
    onAuthStateChanged(this.auth, user => {
      authWithEmailAndPassword.updateUserStoreWithUserObjFromBackend(user);
    });   
  }
}

const firebaseEvents = new FirebaseEvents();