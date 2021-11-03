import * as admin from 'firebase-admin'
import * as functions from "firebase-functions";
// import * as faker from 'faker';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

// import * as firebaseAuth from 'firebase/auth';

// const firestore = admin.firestore()


export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const populateUsers = functions.https.onRequest(async (_, res) => {
  // const { getAuth, createUserWithEmailAndPassword} = firebaseAuth;

  // const auth = getAuth();
  // const promises: Promise<any>[]= [];
  // for(let i = 0; i < 10; i++) {
  //   const p = createUserWithEmailAndPassword(auth, faker.internet.email(), 'testpass');
  //   promises.push(p);
  // }

  // await Promise.all(promises);

  res.send('Populate Database with users.')
})
