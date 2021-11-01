import { collections } from './../globalConstants';
import { getDoc, doc, getFirestore } from 'firebase/firestore';

const db = getFirestore()

export const getOfficeById = async (id: string) => {
  const snapshot = await getDoc(doc(db, `${collections.office}/${id}`));
  return snapshot.data();
}