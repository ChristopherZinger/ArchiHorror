import { collections } from './../globalConstants';
import slugify from 'slugify';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { addCreatedAtField, addCreatedByField } from '../helpers/addFields';
import { FieldCreationError } from '../customErrors'

const db = getFirestore();

export interface NewOfficeUserInput {
  name: string
  city: string
}

export const addOffice = async (userInputOffice: NewOfficeUserInput) => {
  const office = await populateDocumentWithRequiredFields(userInputOffice);

  if (office instanceof FieldCreationError) {
    return office;
  }

  try {
    return await setDoc(doc(db, collections.office, office.slug), office);
  } catch (err) {
    console.error(err);
    return err;
  }
}

const populateDocumentWithRequiredFields = async (office: NewOfficeUserInput) => {
  //TODO in the future those field should be added with cloud function
  const createdAt = addCreatedAtField();
  const createdBy = addCreatedByField();
  const slug = addSlugField(office);

  if (createdBy instanceof FieldCreationError) {
    return createdBy;
  }

  if (slug instanceof FieldCreationError) {
    return slug;
  }

  return {
    ...office,
    slug,
    createdAt,
    createdBy,
  }
}

const addSlugField = (office) => {
  if (!office.city || !office.name) {
    return new FieldCreationError('Office must contain following fields: city, name,')
  }
  const name = slugify(office.name, {lower: true})
  const city = slugify(office.city, {lower: true})
  return `${name}__${city}`;
}