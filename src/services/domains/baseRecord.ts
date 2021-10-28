import { getAuth } from 'firebase/auth';
import { 
  collection,  
  doc,
  DocumentData,
  DocumentReference,
  Firestore, 
  getDoc,
  getDocs, 
  limit,
  startAfter,
  Timestamp,
  query, 
  QueryConstraint,
} from 'firebase/firestore';
import { FieldCreationError } from './customErrors'

export abstract class BaseRecord<T> {
  protected readonly db: Firestore;
  protected readonly collectionName: string;
  protected documentsPerPage: number;
  protected lastLoadedDoc;

  constructor (db: Firestore, collectionName: string, documentsPerPage=1) {
    this.db = db;
    this.collectionName = collectionName;
    this.documentsPerPage = documentsPerPage;
  }

  protected addCreatedAtField () {
    return  Timestamp.fromDate(new Date())
  }

  protected addCreatedByField () {
    const userID  = getAuth()?.currentUser?.uid;

    if (!userID) {
      return new FieldCreationError('Can\'t populate userID field. User is not logged in.');
    }

    return userID;
  }
  // abstract removeDocument (id: string): Promise<T>

  // abstract updateDocument (id: string, document: T): Promise<T>

  public async getDocumentById (id: string) {
    const collectionRef = collection(this.db, this.collectionName);
    const docRef = doc(this.db, this.collectionName, id);
    try{
      const document = await getDoc(docRef);
      return document.data();
    } catch (err) {
      return Error(err.message);
    }
  }

  public async getPaginatedDocuments(options: QueryConstraint[]=[limit(this.documentsPerPage)] ) {
    const queryOptions: QueryConstraint[] = this.addStartCursorToQueryOptions(options);
    return await this.getDocumentsAndSetLastLoadedDoc(queryOptions);
  }

  private addStartCursorToQueryOptions (options: QueryConstraint[]=[]) {
    return this.lastLoadedDoc 
      ? [...options , startAfter(this.lastLoadedDoc)]
      : options; 
  }

  private async getDocumentsAndSetLastLoadedDoc (options: QueryConstraint[]=[]) {
    const documentSnapshots = await this.getDocuments(options);
    this.setLastLoadedDoc(documentSnapshots.docs[documentSnapshots.docs.length-1]);
    return documentSnapshots;
  }

  public async getDocuments (options: QueryConstraint[]=[]) {
    const q = query(collection(this.db, this.collectionName), ...options) 

    // Other Methods exptect this try-catch block to be here. Don't remove it
    try {
      return await getDocs(q);    
    } catch (err) {
      //TODO handle errors
      console.warn('[baseRecord.ts] error in function getDocuments : ', err.message)
    }
  }

  private setLastLoadedDoc (lastLoadedDoc ) {
    this.lastLoadedDoc = lastLoadedDoc;
  }
}