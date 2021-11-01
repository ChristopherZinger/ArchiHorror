import { AuthError } from '../../../constants/errors/authErrors';
import { getAuth } from 'firebase/auth';

export const getUserId = (): string | AuthError => {
  const userID  = getAuth()?.currentUser?.uid;
  if (!userID) {
    return new AuthError('You are not logged in.');
  }
  return userID;
}