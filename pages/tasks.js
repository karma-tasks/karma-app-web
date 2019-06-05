import '../src/bootstrap';
// --- Post bootstrap -----

import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageBase from '../src/components/layout/PageBase';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core/';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { useInputValue, useTasks } from './custom-hooks';

// Reducer...
function reducer(prevState, action) {
  let state = [...prevState];
  switch (action.type) {
  case 'markCompleted':
    console.log('yolo!');
    console.log(action);

    //return { count: state.count + 1 };

    state.forEach((task, i) => {
      console.log(task.id, task);
      if (task.id == action.id) {
        state[i] = { ...task, is_completed: true };
      }
    });

    return state;
  case 'newPersistedTask': {
    let reversed = state.reverse();
    return reversed.concat(action.tasks).reverse();
    //return state;
    //case 'reset':
    //  return init(action.payload);
  }
  default:
    console.log(action);
    throw new Error(`Unknown action: ${action.type}`);
  }
}

function Task(props) {
  let taskId = props.taskId;
  return (
    <ListItem divider={props.divider}>
      <Checkbox
        onClick={() => props.checkboxToggleHandler(taskId)}
        checked={props.task.is_completed}
        disableRipple
      />
      <ListItemText primary={props.task.text} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Tasks"
          onClick={() => props.onDeleteHandler(taskId)}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  //<img style={{height: '60px'}} src={task.profilePicUrl} />
  //<b>{task.name} </b>
  //<p>{task.text}</p>
  //</div>
}

Task.propTypes = {
  task: PropTypes.object,
  taskId: PropTypes.string,
  onDeleteHandler: PropTypes.func,
  checkboxToggleHandler: PropTypes.func,
  divider: PropTypes.bool
};

function AddTask(props) {
  return (
    <Paper elevation={5} style={{ padding: 16, marginBottom: 32 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="What needs to be done?"
            value={props.inputValue}
            onChange={props.onChangeHandler}
            onKeyPress={props.onKeyPressHandler}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullwidth="true"
            color="primary"
            variant="outlined"
            onClick={props.onSubmitHandler}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

AddTask.propTypes = {
  inputValue: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onSubmitHandler: PropTypes.func,
  onKeyPressHandler: PropTypes.func
};

function TaskList(props) {
  let taskObjects = props.items.map(doc => ({ id: doc.id, ...doc.data() }));

  const [tasks, dispatch] = useReducer(reducer, taskObjects);

  useEffect(
    () => {
      console.log('new stuff?');
      console.log(tasks);
      let newObjects = props.items.map(doc => ({ id: doc.id, ...doc.data() }));

      let tasksToAdd = [];
      // Note this only works for adding new ones at the moment...
      newObjects.forEach(newTask => {
        let found = false;
        tasks.forEach(oldTask => {
          if (oldTask.id == newTask.id) {
            found = true;
          }
        });

        if (!found) {
          tasksToAdd.push(newTask);
        }
      });

      if (tasksToAdd.length > 0) {
        console.log(tasksToAdd);
        // Ideally insert into the order it was in
        dispatch({ type: 'newPersistedTask', tasks: tasksToAdd });
      }
    },
    [JSON.stringify(taskObjects).length]
  );

  console.log(JSON.stringify(taskObjects).length);

  function markTaskCompleted(id) {
    console.log(id);
    dispatch({ type: 'markCompleted', id: id });
  }

  return (
    <Paper style={{ marginBottom: 16 }}>
      <List>
        {tasks.map((task, idx) => {
          return (
            <Task
              taskId={task.id}
              task={task}
              key={task.id}
              divider={idx !== tasks.length - 1}
              checkboxToggleHandler={markTaskCompleted} //{props.onItemChecked}
              onDeleteHandler={props.onItemRemove}
            />
          );
        })}
      </List>
    </Paper>
  );
}

TaskList.propTypes = {
  items: PropTypes.array,
  onItemChecked: PropTypes.func,
  onItemRemove: PropTypes.func
};

function HomeComponent() {
  // Subscribe to data stream
  //const { error, loading, value } = useCollection(
  //  new FirebaseClient().firestore().collection('messages').orderBy('timestamp', 'desc')
  //);

  //
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { firestoreState, addTask, markTaskCompleted, deleteTask } = useTasks();
  const { error, loading, value } = firestoreState;

  const clearAndAdd = () => {
    clearInput();
    addTask(inputValue);
  };

  return (
    <PageBase loginRequired={true}>
      <Paper
        elevation={0}
        style={{ padding: 0, margin: 0, backgroundColor: '#fafafa' }}
      >
        <AddTask
          inputValue={inputValue}
          onChangeHandler={changeInput}
          onSubmitHandler={clearAndAdd}
          onKeyPressHandler={event => keyInput(event, clearAndAdd)}
        />

        {error && <strong>Error: {error}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <TaskList
            items={value.docs}
            onItemChecked={id => markTaskCompleted(id)}
            onItemRemove={id => deleteTask(id)}
          />
        )}
      </Paper>
    </PageBase>
  );
}

export default HomeComponent;
