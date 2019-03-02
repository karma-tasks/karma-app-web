// Firebase AuthProvider

import React from 'react';

import FirebaseClient from './FirebaseClient';
import * as firebase from 'firebase';

const defaultFirebaseContext = {
  authStatusReported: false,
  isUserSignedIn: false
};

export const FirebaseAuthContext = React.createContext(defaultFirebaseContext);

export default class FirebaseAuthProvider extends React.Component {

  state = defaultFirebaseContext;

  componentDidMount() {

    new FirebaseClient();

    console.log('YOLO!!!!');

    firebase.auth().onAuthStateChanged(user => {
      console.log('IS THIS THING ON????');

      this.setState({
        authStatusReported: true,
        isUserSignedIn: !!user
      });
    });
  }

  render() {
    const {children} = this.props;
    const {authStatusReported, isUserSignedIn} = this.state;

    return (
      <FirebaseAuthContext.Provider value={{isUserSignedIn, authStatusReported}}>
        {authStatusReported && children}
      </FirebaseAuthContext.Provider>
    );
  }
}
