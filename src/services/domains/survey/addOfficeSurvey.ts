import { FIRESTORE_ERRORS, FirestoreError } from './../../../constants/errors/firestoreErrors';
import { AuthError } from './../../../constants/errors/authErrors';
import { addCreatedByField, addCreatedAtField } from './../helpers/addFields';
import { collections } from './../globalConstants';
import { getFirestore, addDoc, collection, doc, Timestamp } from 'firebase/firestore';


const db = getFirestore();

export interface NewSurveyUserInput extends Object {
  boringProjects: boolean;
  delayedOrReducedSalary: boolean; 
  microManagement: boolean;
  glassCeiling: boolean;
  homophobia: boolean;
  hostileManagement: boolean;
  overtime: boolean;
  racism: boolean;
  sexism: boolean;
  starvingSalary: boolean;
  toxicAtmosphere: boolean;
  workOnTheWeekends: boolean;
  violence: boolean;
  unpaidInternship: boolean;
}

interface SurveyWithMetaFields extends NewSurveyUserInput {
  createdAt: Timestamp;
  createdBy: string;
  officeId: string;
}

export const addOfficeSurvey = async (userInput: NewSurveyUserInput, officeId:string) => {
  const survey = addMetaFields(userInput, officeId);
  try {
    return await addDoc(collection(db, `${collections.office}/${officeId}/${collections.survey}`), survey);
  }
  catch (error) {
    return new FirestoreError(error.message, FIRESTORE_ERRORS.DOCUMENT_CREATE_ERROR);
  }
}

const addMetaFields = (document: NewSurveyUserInput, officeId: string): SurveyWithMetaFields | AuthError => {
  const createdAtField = addCreatedAtField();
  const createdByField = addCreatedByField();

  if (createdAtField instanceof AuthError) {
    return createdAtField;
  }

  return {...document, ...createdByField, ...createdAtField, officeId};
}