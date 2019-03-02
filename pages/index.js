import React from 'react';
import PageBase from '../src/components/layout/PageBase';
import Typography from '@material-ui/core/Typography';

function HomeComponent() {
  // Subscribe to data stream

  return (
    <PageBase loginRequired={false}>
      <Typography variant="h2" gutterBottom>Welcome</Typography>
      <p>This page is Public</p>
    </PageBase>
  );
}

export default HomeComponent;
