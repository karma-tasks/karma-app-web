// Simple firebase client
import firebaseApp from 'firebase/app';
import * as firebase from 'firebase';
let firebaseAppSingleton = null;

export default class FirebaseClient {
  constructor() {

    if (!firebaseAppSingleton) {
      try {
        firebaseApp.initializeApp({
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DB_URL,
          projectId: process.env.GCLOUD_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_FCM_SENDER_ID
        });
        firebaseAppSingleton = true;
      } catch(e) {
        console.error(e);
      }
    }

    //
    this.auth = firebase.auth;
    this.firestore = firebase.firestore;
  }
}
