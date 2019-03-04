import React from 'react';
import PageBase from '../src/components/layout/PageBase';
import Typography from '@material-ui/core/Typography';

function HomeComponent() {
  // Subscribe to data stream

  return (
    <PageBase loginRequired={false}>
      <Typography variant="h4" gutterBottom>Welcome</Typography>
      <p>This is a simple test project that includes proof of concepts for:</p>
      <ul>
        <li>Firebase Authentication with Google</li>
        <li>Using Firestore in the client and subscribing to a query</li>
        <li>Using react firestore hooks</li>
        <li>Using reactfirebase-hooks</li>
        <li>Writing Custom hooks</li>
        <li>Using Next.js 8</li>
        <li>Using latest material-ui hooks (In progress)</li>
      </ul>

      <p>Try navigating to pages listed below. You will be prompted to login with Google if you are not logged in. The /tasks page has some cool stuff going on.</p>
    </PageBase>
  );
}

export default HomeComponent;
