export enum FIRESTORE_ERRORS {
  DEFAULT= 'FIRESTORE_ERROR',
  DOCUMENT_CREATE_ERROR = 'FIRESTORE_DOCUMENT_CREATE_ERROR',
}

export class FirestoreError extends Error {
  constructor(msg: string, name: FIRESTORE_ERRORS=FIRESTORE_ERRORS.DEFAULT) {
    super(msg);
    this.name = name
  }
};
