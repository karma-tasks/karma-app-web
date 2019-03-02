import React from 'react';
import PropTypes from 'prop-types';

import AppBar from './AppBar';
import Link from 'next/link';
import FirebaseAuthProvider, {FirebaseAuthContext} from '../../services/Firebase/FirebaseAuthProvider';

import Button from '@material-ui/core/Button';
import FirebaseClient from '../../services/Firebase/FirebaseClient';


async function doLogin() {
  let client = new FirebaseClient();

  try {
    var provider = new client.auth.GoogleAuthProvider();
    await client.auth().signInWithPopup(provider);
    console.log('You are logged in I think.');
  } catch (e) {
    alert(e);
  }
}


// This is a decorator of sorts
function AuthRequired(props) {
  return (
    <FirebaseAuthContext.Consumer>
      {
        (ctx) => {
          console.log(ctx);
          let {isUserSignedIn} = ctx;

          if (isUserSignedIn) {
            return props.children;
          }
          return (
            <div>
              <b>Gandalf Yo.</b>
              <Button variant="contained" color="primary" onClick={doLogin}>Login</Button>
            </div>
          );
        }
      }
    </FirebaseAuthContext.Consumer>
  );
}

AuthRequired.propTypes = {
  children: PropTypes.node
};


export default function PageBase(props) {

  let wrapper = {component: 'div'};
  if (props.loginRequired) {
    wrapper.component = AuthRequired;
  }

  return (
    <FirebaseAuthProvider>
      <wrapper.component>
        <AppBar />
        { props.children }

        <Link href="/"><a>index (public)</a></Link> | <Link href="/public"><a>another (public)</a></Link> | <Link href="/tasks"><a>tasks (secure)</a></Link> | <Link href="/environment"><a>environment (secure)</a></Link>
      </wrapper.component>
    </FirebaseAuthProvider>
  );
}

PageBase.propTypes = {
  children: PropTypes.node,
  loginRequired: PropTypes.bool
};
