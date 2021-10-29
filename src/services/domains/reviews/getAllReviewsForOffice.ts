import { collections } from './../globalConstants';
import { db } from './../../firebase/connectToFirebaseDB';
import {query, collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';


export const getAllReviewsForTheOffice = async (officeId: string) => {
      const querySnapshot = await getReviewsSnapshot(officeId);
      return convertSnapshotToListOfReviews(querySnapshot);
}

const getReviewsSnapshot = async (officeId: string) => {
    const q = query(collection(db, `${collections.office}/${officeId}/${collections.review}`));
    try {
      return await getDocs(q);
    } catch (err) {
      console.error(err.message);
      return err;
    }
}

const convertSnapshotToListOfReviews = (querySnapshot: QuerySnapshot<DocumentData>) => {
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

