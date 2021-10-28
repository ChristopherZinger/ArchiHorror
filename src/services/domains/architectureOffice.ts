import { db } from '../firebase/connectToFirebaseDB';
import { collection, addDoc, doc, Firestore, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { BaseRecord } from './baseRecord';
import { getAuth } from 'firebase/auth';
import slugify from 'slugify';

class FieldCreationError extends Error {};


export interface ArchitectureOfficeRecord {
  name: string;
  city: string
}

class ArchitectureOffice extends BaseRecord<ArchitectureOfficeRecord> {
  constructor (db: Firestore ) {
    super(db, 'architecture-offices');
  }

  public async addDocument (document: ArchitectureOfficeRecord) {
    const office = this.populateDocumentWithRequiredFields(document);

    if (office instanceof FieldCreationError) {
      return office;
    }

    try {
      return await setDoc(doc(this.db, this.collectionName, office.slug), office);
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  private populateDocumentWithRequiredFields (office) {
    //TODO in the future those field should be added with cloud function
    const createdAt = this.addCreatedAtField();
    const createdBy = this.addCreatedByField();
    const slug = this.addSlugField(office);

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

  private addCreatedAtField () {
    return  Timestamp.fromDate(new Date())
  }

  private addCreatedByField () {
    const userID  = getAuth()?.currentUser?.uid;

    if (!userID) {
      return new FieldCreationError('Can\'t populate userID field. User is not logged in.');
    }

    return userID;
  }

  private addSlugField (office) {
    if (!office.city || !office.name) {
      return new FieldCreationError('Office must contain following fields: city, name,')
    }
    const name = slugify(office.name, {lower: true})
    const city = slugify(office.city, {lower: true})
    return `${name}__${city}`;
  }
}

export const architectureOffice = new ArchitectureOffice(db);



