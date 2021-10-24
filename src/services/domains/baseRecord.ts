import type { Firestore /*, doc, getDocs, collection */ } from 'firebase/firestore';

export abstract class BaseRecord<T> {
  db: Firestore;
  collectionName: string;

  constructor (db: Firestore, collectionName: string) {
    this.db = db;
    this.collectionName = collectionName;
  }

  abstract addDocument (document: T): Promise<T> 

  // abstract removeDocument (id: string): Promise<T>

  // abstract updateDocument (id: string, document: T): Promise<T>

  // abstract getDocumentById (id: string): Promise<T>

  // public async getAllDocuments () {
  //   try {
  //     return await getDocs(collection(this.db, this.collectionName));
  //   } catch (err) {
  //     console.warn(err.code, ': ', err.message)
  //   }
  // }
}