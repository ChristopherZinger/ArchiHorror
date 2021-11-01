import * as functions from "firebase-functions";
import { doc, getDoc } from 'firebase/firestore';
import { initializeApp } form 'firebase/app';

initializeApp()

export const helloWorld = functions.https.onRequest((_, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
