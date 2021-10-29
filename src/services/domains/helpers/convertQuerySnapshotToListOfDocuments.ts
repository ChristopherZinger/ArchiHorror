import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

export const convertSnapshotToListOfDocuments = (s: QuerySnapshot): DocumentData[] => {
  const arr = [];
  s.forEach(i => arr.push(i.data()));
  return arr;
}