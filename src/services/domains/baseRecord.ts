import { 
  collection,  
  DocumentData,
  DocumentReference,
  Firestore, 
  limit,
  getDocs, 
  startAfter,
  query, 
  QueryConstraint,
} from 'firebase/firestore';

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

  abstract addDocument (record: T): Promise<DocumentReference<DocumentData>>

  // abstract removeDocument (id: string): Promise<T>

  // abstract updateDocument (id: string, document: T): Promise<T>

  // abstract getDocumentById (id: string): Promise<T>

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