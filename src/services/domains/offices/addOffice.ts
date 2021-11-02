import { AuthError } from '../../../constants/errors/authErrors';
import { FirestoreError, FIRESTORE_ERRORS } from '../../../constants/errors/firestoreErrors';
import { collections } from './../globalConstants';
import slugify from 'slugify';
import { setDoc, doc, getFirestore, Timestamp } from 'firebase/firestore';
import { addCreatedAtField, addCreatedByField } from '../helpers/addFields';
import { FieldCreationError } from '../../../constants/errors/fieldCreateErrors'

const db = getFirestore();

export interface NewOfficeUserInput {
  name: string
  city: string
}

export interface OfficeWithMetaFields extends NewOfficeUserInput {
  createdAt: Timestamp;
  createdBy: string;
  slug: string;
}

export const addOffice = async (userInputOffice: NewOfficeUserInput) => {
  const office = populateDocumentWithRequiredFields(userInputOffice);
  if (office instanceof AuthError) {
    return office 
  }

  try {
    setDoc(doc(db, collections.office, office.slug), office);
    return office
  } catch (err) {
    return new FirestoreError(err.message, FIRESTORE_ERRORS.DOCUMENT_CREATE_ERROR);
  }
}

const populateDocumentWithRequiredFields = (office: NewOfficeUserInput): OfficeWithMetaFields | AuthError   => {
  //TODO in the future those field should be added with cloud function
  const createdAtField = addCreatedAtField();
  const slugField = addSlugField(office);
  const createdByField = addCreatedByField();

  if (createdByField instanceof AuthError) {
    return createdByField;
  }

  if (slugField instanceof FieldCreationError) {
    return slugField;
  }

  return {...office, ...createdAtField, ...createdByField, ...slugField};
}

const addSlugField = (office: NewOfficeUserInput) => {
  if (!office.city || !office.name) {
    return new FieldCreationError('Office must contain following fields: city, name,')
  }

  const name = slugify(office.name, {lower: true})
  const city = slugify(office.city, {lower: true})

  return { slug: `${name}__${city}`};
}
