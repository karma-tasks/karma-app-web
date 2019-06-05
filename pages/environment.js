import '../src/bootstrap';
// --- Post bootstrap -----

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PageBase from '../src/components/layout/PageBase';

const styles = theme => ({
  root: {
    //textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
});

function About(props) {
  const { classes } = props;

  return (
    <PageBase loginRequired={true}>
      <div className={classes.root}>
        <Typography variant="h2" gutterBottom>Environment</Typography>
        <Typography variant="subtitle1" gutterBottom>Firebase</Typography>
        <Typography gutterBottom component="div">
          <ul>
            <li><b>NODE_ENV</b> {process.env.NODE_ENV}</li>
            <li><b>GAE_APPLICATION</b> {process.env.GAE_APPLICATION}</li>
            <li><b>GAE_DEPLOYMENT_ID</b> {process.env.GAE_DEPLOYMENT_ID}</li>
            <li><b>GAE_ENV</b> {process.env.GAE_ENV}</li>
            <li><b>PORT</b> {process.env.PORT}</li>


            <li><b>GCLOUD_PROJECT_ID</b> {process.env.GCLOUD_PROJECT_ID}</li>
            <li><b>FIREBASE_API_KEY</b> {process.env.FIREBASE_API_KEY}</li>
            <li><b>FIREBASE_AUTH_DOMAIN</b> {process.env.FIREBASE_AUTH_DOMAIN}</li>

            <li><b>FIREBASE_DB_URL</b> {process.env.FIREBASE_DB_URL}</li>
            <li><b>FIREBASE_FCM_SENDER_ID</b> {process.env.FIREBASE_FCM_SENDER_ID}</li>
            <li><b>FIREBASE_STORAGE_BUCKET</b> {process.env.FIREBASE_STORAGE_BUCKET}</li>
          </ul>
        </Typography>
      </div>
    </PageBase>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
