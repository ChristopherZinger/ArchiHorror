import { getUserId } from './user';
import { Timestamp } from 'firebase/firestore';

export const addCreatedAtField = () => {
  return  Timestamp.fromDate(new Date())
}

export const addCreatedByField = () => {
  return getUserId();
}