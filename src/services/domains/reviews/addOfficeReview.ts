import { db } from './../../firebase/connectToFirebaseDB';
import type { NewReviewUserInput } from '../review';
import { addCreatedAtField, addCreatedByField } from '../helpers/addFields';
import { collections } from '../globalConstants';
import { collection, addDoc } from 'firebase/firestore';

export const addOfficeReview = async (review: NewReviewUserInput, officeId: string) => {
    const reviewWithRequiredFields = populateDocumentWithRequiredFields(review);

    try {
      return await addDoc(
        collection(db, `${collections.office}/${officeId}/${collections.review}`), 
        reviewWithRequiredFields);
    } catch (err) {
      console.error(err.message);
      return err;
    }
}

const populateDocumentWithRequiredFields = (review: NewReviewUserInput) => {
    //TODO in the future those field should be added with cloud function
    const createdAt = addCreatedAtField();
    const createdBy = addCreatedByField();

    return {
      ...review,
      createdAt,
      createdBy,
    }
  }