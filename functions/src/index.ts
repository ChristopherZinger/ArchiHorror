import * as admin from 'firebase-admin'
import * as functions from "firebase-functions";

admin.initializeApp();

const firestore = admin.firestore()

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const createUserDocOnNewUserSignup = functions.auth.user().onCreate((user) => {
  return firestore.doc(`/users/${user.uid}`).set({
    createdAt: admin.firestore.Timestamp.fromDate(new Date()) ,
    roles: ['basic_user'],
  })
})

export const deleteUserDocOnUserDelete = functions.auth.user().onDelete(user => {
  return firestore.doc(`/users/${user.uid}`).delete();
})
