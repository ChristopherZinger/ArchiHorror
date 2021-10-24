import { db } from '../firebase/connectToFirebaseDB';
import { collection, getDocs, addDoc, Firestore } from 'firebase/firestore';
import { BaseRecord } from './baseRecord';

export interface ArchitectureOfficeRecord {
  name: string;
  createdAt: Date | undefined
  city: string
}

class ArchitectureOffice extends BaseRecord<ArchitectureOfficeRecord> {
  constructor (db: Firestore ) {
    super(db, 'architecture-offices');
  }

  public async addDocument (document: ArchitectureOfficeRecord) {
    try {
      const createdDoc = await addDoc(collection( this.db, this.collectionName ), document);
      console.log("Created Doc: ", createdDoc);
      return createdDoc;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

export const architectureOffice = new ArchitectureOffice(db);



