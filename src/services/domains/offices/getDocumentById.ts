import { collections } from './../globalConstants';
import { db } from './../../firebase/connectToFirebaseDB';
import { getDoc, doc } from 'firebase/firestore';

export const getOfficeById = async (id: string) => {
  return await getDoc(doc(db, `${collections.office}/${id}`));
}