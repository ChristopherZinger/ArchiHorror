import { getAuth } from 'firebase/auth';
import { FieldCreationError } from '../customErrors'

export const getUserId = () => {
  const userID  = getAuth()?.currentUser?.uid;
  if (!userID) {
    return new FieldCreationError('Can\'t populate userID field. User is not logged in.');
  }
  return userID;
}