// Firebase AuthProvider

import React from 'react';
import PropTypes from 'prop-types';

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
      this.setState({
        authStatusReported: true,
        isUserSignedIn: !!user,
        user: user
      });
    });
  }

  render() {
    const {children} = this.props;
    const {authStatusReported, isUserSignedIn, user} = this.state;

    return (
      <FirebaseAuthContext.Provider value={{isUserSignedIn, authStatusReported, user}}>
        {authStatusReported && children}
      </FirebaseAuthContext.Provider>
    );
  }
}

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node
};
