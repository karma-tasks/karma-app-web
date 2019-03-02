import React, { Component } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import * as firebase from 'firebase';
import firebaseApp from 'firebase/app';
const FirebaseContext = React.createContext(null);


let firebaseAppSingleton = null;

class Firebase {
  constructor() {
    console.log(firebaseAppSingleton);

   if (!firebaseAppSingleton) {
     firebaseApp.initializeApp({
         apiKey: process.env.FIREBASE_API_KEY,
         authDomain: process.env.FIREBASE_AUTH_DOMAIN,
         databaseURL: process.env.FIREBASE_DB_URL,
         projectId: process.env.GCLOUD_PROJECT_ID,
         storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
         messagingSenderId: process.env.FIREBASE_FCM_SENDER_ID
       });
       firebaseAppSingleton = true;
    }
 }
}

const Task = ({task}) => {
  //console.log(task);
  return (
    <div style={{border:'1px solid silver'}}>
      <img style={{height: '60px'}} src={task.profilePicUrl} />
      <b>{task.name} </b>
      <p>{task.text}</p>
    </div>
  );
}


function HomeComponent() {

    // Subscribe to data stream
    const { error, loading, value } = useCollection(
      firebase.firestore().collection('messages').orderBy("timestamp", "desc")
    );
    console.log({error, loading, value})


    return (

        <div>
          <h2>Environment</h2>

          <li><b>Test</b> {process.env.TEST}</li>
          <li><b>GCLOUD_PROJECT_ID</b> {process.env.GCLOUD_PROJECT_ID}</li>
          <li><b>FIREBASE_API_KEY</b> {process.env.FIREBASE_API_KEY}</li>
          <li><b>FIREBASE_AUTH_DOMAIN</b> {process.env.FIREBASE_AUTH_DOMAIN}</li>

          <li><b>FIREBASE_DB_URL</b> {process.env.FIREBASE_DB_URL}</li>
          <li><b>FIREBASE_FCM_SENDER_ID</b> {process.env.FIREBASE_FCM_SENDER_ID}</li>
          <li><b>FIREBASE_STORAGE_BUCKET</b> {process.env.FIREBASE_STORAGE_BUCKET}</li>

          <h2>Firebase State</h2>
          {error && <strong>Error: {error}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value && (
                        <span>
                          Collection:{' '}
                          {value.docs.map(doc => (<Task key={doc.id} task={doc.data()} />))}


                          {value.docs.map(doc => (
                            <React.Fragment key={doc.id}>
                              {JSON.stringify(doc.data())},{' '}
                            </React.Fragment>
                          ))}
                        </span>
                      )}


        </div>
    );
};


function Home() {
  return <FirebaseContext.Provider value={new Firebase()}><HomeComponent /></FirebaseContext.Provider>
}

export default Home
