import { db } from '../firebase/connectToFirebaseDB';
import { collection, addDoc, doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { BaseRecord } from './baseRecord';
import { getAuth } from 'firebase/auth';
import slugify from 'slugify';

export interface ArchitectureOfficeRecord {
  name: string;
  city: string
}

class ArchitectureOffice extends BaseRecord<ArchitectureOfficeRecord> {
  constructor (db: Firestore ) {
    super(db, 'architecture-offices');
  }

  public async create (document: ArchitectureOfficeRecord) {
    const doc = this.populateDocumentWithRequiredFields(document);

    if (!doc) {
      throw new Error('Could not create new office.');
    }

    try {
      return await addDoc(collection( this.db, this.collectionName ), doc);
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  private populateDocumentWithRequiredFields (office) {
    try {
      return {
        ...document,
        ...this.addCreatorField(),
        ...this.addSlugField(office),
      }
    } catch (err) {
      console.warn(err.message);
      return;
    }
  }

  private addCreatorField () {
    const userID  = getAuth()?.currentUser?.uid;

    if (!userID) {
      throw new Error('You have to be logged in to add an office.');
    }

    return { createdBy: userID}
  }

  private addSlugField (office) {
    const slug = slugify(office.name + '--' + office.city, {
      lower: true,
      strict: true,
    })
    return { slug }
  }
}

export const architectureOffice = new ArchitectureOffice(db);



