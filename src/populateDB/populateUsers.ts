import { authWithEmailAndPassword } from './../services/auth/authWithEmailAndPassword';
import * as faker from 'faker';

export const getUserPopulator = (nrOfUsers = 10) => {
  let usersArePopulated = false;

  return async () => {
    if (!usersArePopulated) {
      const promises: Promise<any>[]= [];
      for(let i = 0; i < nrOfUsers; i++) {
        const email = `user${i}@email.com`;
          const p = authWithEmailAndPassword.createUser(email, 'testpass');
          promises.push(p);
      }

      await Promise.all(promises).catch(err => {
          console.error(`Error while populating users`, err.message)
      });
      
      usersArePopulated = true;
      return true;
    }
    return false;

  }
}