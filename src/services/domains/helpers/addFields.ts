import { AuthError } from '../../../constants/errors/authErrors';
import { getUserId } from './user';
import { Timestamp } from 'firebase/firestore';

export const addCreatedAtField = (): {createdAt: Timestamp} => {
  return {createdAt: Timestamp.fromDate(new Date())}; 
}

export const addCreatedByField = (): AuthError | { createdBy: string} => {
  const user = getUserId();
  if (user instanceof AuthError) {
    return user;
  }
  return { createdBy: user};
}
