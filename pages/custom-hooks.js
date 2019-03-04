// Custom Hooks

import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import FirebaseClient from '../src/services/Firebase/FirebaseClient';

const TASK_KIND = 'messages';

// Form State
export const useInputValue = (initialValue = '') => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: event => {
      console.log('YOLO');
      return setInputValue(event.target.value);
    },
    clearInput: () => {
      console.log('Party');
      return setInputValue('');
    },
    keyInput: (event, callback) => {
      console.log('YOKA');
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }
      return false;
    }
  };
};

// Task Actions
export const useTasks = (initialValue=[]) => {
  //const [tasks, setTasks] = useState(initialValue);

  let client = new FirebaseClient();

  const { error, loading, value } = useCollection(
    client.firestore().collection(TASK_KIND).orderBy('timestamp', 'desc')
  );

  return {
    firestoreState: {error, loading, value},

    addTask: text => {
      if (text !== '') {

        // Add a new message entry to the Firebase database.
        return client.firestore().collection(TASK_KIND).add({
          name: 'Party',
          text: text,
          is_completed: false,
          profilePicUrl: '', //getProfilePicUrl(),
          timestamp: client.firestore.FieldValue.serverTimestamp()
        }).catch(function(error) {
          console.error('Error writing new message to Firebase Database', error);
        });
      }
    },
    markTaskCompleted: id => {
      var docRef = client.firestore().collection(TASK_KIND).doc(id);

      var o = {};
      docRef.get().then(function(thisDoc) {

        if (thisDoc.exists) {
          o = thisDoc.data();
          //user is already there, write only last login
          o.is_completed = !o.is_completed;
          docRef.update(o);
        }
        else {
          //
          console.log('DOES NOT EXIST???');
        }
      });
    },
    deleteTask: id => {
      console.log('DELETE TASK:' + id);


      client.firestore().collection(TASK_KIND).doc(id).delete().then(function() {
        console.log('Document successfully deleted!');
      }).catch(function(error) {
        console.error('Error removing document: ', error);
      });
    }
  };
}
