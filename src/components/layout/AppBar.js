import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FirebaseClient from '../../services/Firebase/FirebaseClient';
import {FirebaseAuthContext} from '../../services/Firebase/FirebaseAuthProvider';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


async function doLogout() {
  let client = new FirebaseClient();

  try {
    await client.auth().signOut();
    console.log('you are signed out...');
  } catch (e) {
    alert(e);
  }
}

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


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'block',
  }
});

export default function ButtonAppBar() {
  const classes = useStyles();

  const [profileMenuState, setProfileMenuState] = useState({isOpen: false, anchorEl: null});


  const handleProfileMenuOpen = (event) => {
    let newState = {...profileMenuState, isOpen: true, anchorEl: event.currentTarget};
    setProfileMenuState(newState);
  };

  const handleProfileMenuClose = () => {
    let newState = {...profileMenuState, isOpen: false, anchorEl: null};
    setProfileMenuState(newState);
  };


  const renderMenu = (
    <Menu
      anchorEl={profileMenuState.anchorEl}
      //anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      //transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      open={profileMenuState.isOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={() => {
        doLogout();
        handleProfileMenuClose();
      }}>Sign Out</MenuItem>
    </Menu>
  );



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h6" color="inherit" className={classes.title}>
            Karma Tasks
          </Typography>

          <div className={classes.grow} />

          <FirebaseAuthContext.Consumer>
            {
              (ctx) => {
                let {isUserSignedIn, user} = ctx;

                if (isUserSignedIn) {
                  let avatar = (<Avatar alt="Logged In" onClick={handleProfileMenuOpen}><FolderIcon /></Avatar>);
                  if (user.photoURL) {
                    avatar = (<Avatar alt="Logged In" onClick={handleProfileMenuOpen} src={user.photoURL} />);
                  }

                  return (
                    <div>
                      { avatar }
                      { renderMenu }
                    </div>
                  );
                }
                return (<div><Button color="inherit" onClick={doLogin}>Sign In</Button></div>);
              }
            }
          </FirebaseAuthContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {};
