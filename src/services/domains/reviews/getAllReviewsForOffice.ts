import { collections } from './../globalConstants';
import { query, collection, getDocs, QuerySnapshot, DocumentData, getFirestore } from 'firebase/firestore';


const db = getFirestore();

export const getAllReviewsForTheOffice = async (officeId: string) => {
  try {
    const querySnapshot = await getReviewsSnapshot(officeId);
    return convertSnapshotToListOfReviews(querySnapshot);
  } catch (err) {
    return new Error(err.message);
  }
}

const getReviewsSnapshot = async (officeId: string) => {
  const collectionPath =  `${collections.office}/${officeId}/${collections.review}`;
  const q = query(collection(db, `${collections.office}/${officeId}/${collections.review}`));
  return await getDocs(q);
}

const convertSnapshotToListOfReviews = (querySnapshot: QuerySnapshot<DocumentData>) => {
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

