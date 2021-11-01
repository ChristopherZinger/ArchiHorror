import { convertSnapshotToListOfDocuments } from './convertQuerySnapshotToListOfDocuments';
import { limit, startAfter, collection, query, getDocs, QueryConstraint, getFirestore } from 'firebase/firestore';

const db = getFirestore();

export class PaginationRangeError extends Error {}

export const getPagination = (collectionPath: string, options: QueryConstraint[]=[]) => {
  let lastDoc;
  let allDocumentsWereLoaded = false;
  const queryOptions = options.length ? options : [limit(2)];

  const setLastDoc = (snapshots) => {
    lastDoc = snapshots.docs[snapshots.docs.length - 1];

    if (!lastDoc) {
      allDocumentsWereLoaded = true;
      throw new PaginationRangeError('There are no more documents in this collection')
    }
  }

  const addLastVisibleDocToQuery = () => {
    if (lastDoc) {
      queryOptions.push(startAfter(lastDoc));
    }
  }

  const returnIfAllDocumentsWereLoaded = () => {
    if (allDocumentsWereLoaded) {
      return [];
    }
  }

  return async () => {
    returnIfAllDocumentsWereLoaded();
    addLastVisibleDocToQuery();
    const q = query(collection(db, collectionPath), ...queryOptions);
    const snapshots = await getDocs(q);
    const docs = convertSnapshotToListOfDocuments(snapshots);
    setLastDoc(snapshots)
    return docs;
  }
}
