import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import PageBase from '../src/components/layout/PageBase';

import FirebaseClient from '../src/services/Firebase/FirebaseClient';
import Typography from '@material-ui/core/Typography';


const Task = ({task}) => {
  //console.log(task);
  return (
    <div style={{border:'1px solid silver'}}>
      <img style={{height: '60px'}} src={task.profilePicUrl} />
      <b>{task.name} </b>
      <p>{task.text}</p>
    </div>
  );
};


function HomeComponent() {
  // Subscribe to data stream
  const { error, loading, value } = useCollection(
    new FirebaseClient().firestore().collection('messages').orderBy('timestamp', 'desc')
  );

  console.log({error, loading, value});

  return (
    <PageBase loginRequired={true}>
      <Typography variant="h2" gutterBottom>Tasks</Typography>

      {error && <strong>Error: {error}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <span>
          Collection:{' '}
          {value.docs.map(doc => (<Task key={doc.id} task={doc.data()} />))}


          {value.docs.map(doc => (
            <React.Fragment key={doc.id}>
              {JSON.stringify(doc.data())},{' '}
            </React.Fragment>))
          }
        </span>
      )}
    </PageBase>
  );
}

export default HomeComponent;
