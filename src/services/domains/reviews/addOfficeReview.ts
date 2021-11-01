import { FIRESTORE_ERRORS, FirestoreError } from './../../../constants/errors/firestoreErrors';
import { AuthError } from './../../../constants/errors/authErrors';
import { addCreatedAtField, addCreatedByField } from '../helpers/addFields';
import { collections } from '../globalConstants';
import { collection, addDoc, getFirestore, Timestamp, DocumentReference, DocumentData } from 'firebase/firestore';

const db = getFirestore()

interface NewReviewUserInput {
  text: string
}

interface ReviewWithMetafields {
  text: string;
  createdAt: Timestamp;
  createdBy: string;
}

export const addOfficeReview = async (review: NewReviewUserInput, officeId: string): Promise<DocumentReference<DocumentData> | AuthError> => {
  const reviewWithRequiredFields = populateDocumentWithRequiredFields(review);
  if (reviewWithRequiredFields instanceof AuthError) {
    return reviewWithRequiredFields;
  }

  try {
    return await addDoc(
      collection(db, `${collections.office}/${officeId}/${collections.review}`), 
      reviewWithRequiredFields);
  } catch (err) {
    return new FirestoreError('Error while creating a document', FIRESTORE_ERRORS.DOCUMENT_CREATE_ERROR);
  }
}

const populateDocumentWithRequiredFields = (review: NewReviewUserInput): ReviewWithMetafields | AuthError => {
  //TODO in the future those field should be added with cloud function
  const createdAtField = addCreatedAtField();
  const createdByField = addCreatedByField();
  if (createdByField instanceof AuthError) {
    return createdByField;
  }
  return {...review, ...createdAtField, ...createdByField};
}