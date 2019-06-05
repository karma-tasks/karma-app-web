// Firebase AuthProvider

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FirebaseClient from './FirebaseClient';

const defaultFirebaseContext = {
  authStatusReported: false,
  isUserSignedIn: false,
  user: null
};

export const FirebaseAuthContext = React.createContext(defaultFirebaseContext);

export default class FirebaseAuthProvider extends React.Component {
  state = defaultFirebaseContext;

  componentDidMount() {
    const client = new FirebaseClient();

    // Register for Google Auth Change Events
    client.auth().onAuthStateChanged(user => {
      // console.log(user.displayName);
      // console.log(user.email);
      // console.log(user.emailVerified);
      // console.log(user.isAnonymous);
      // console.log(user.metadata);
      // console.log(user.photoURL);
      //
      // console.log(user.providerData); //"1551488254432" "1551840254634"
      // console.log(user.providerId);
      // console.log(user.refreshToken);
      // console.log(user.uid);

      /*
      user.getIdToken().then(function(idToken) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(idToken);

        axios
          .post('/auth/authenticate', {
            providerId: user.providerId,
            token: idToken,
            taco: 'true'
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });

        return;
      });
      */

      console.log('?????????????');
      // https://stackoverflow.com/questions/53778717/migrating-from-google-sign-in-for-android-to-firebase-authentication
      // Send POST to our auth handler...

      this.setState({
        authStatusReported: true,
        isUserSignedIn: !!user,
        user: user
      });
    });
  }

  render() {
    const { children } = this.props;
    const { authStatusReported, isUserSignedIn, user } = this.state;

    return (
      <FirebaseAuthContext.Provider
        value={{ isUserSignedIn, authStatusReported, user }}
      >
        {authStatusReported && children}
      </FirebaseAuthContext.Provider>
    );
  }
}

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node
};
