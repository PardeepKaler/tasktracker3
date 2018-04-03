import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {browserHistory} from 'react-router';
import Nav from './nav';
import Users from './users';
import Tasks from './tasks';
import Task from './task';
import Register from './register-form';
import NewTask from './newTask';
import LoginForm from './login-form';
import TaskEdit from './taskedit'
import {  Redirect } from 'react-router';
//import LoginForm from './login-form';

export default function tasktracker3_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasktracker = connect((state) => state)((props) => {
  return (
    <Router history={browserHistory}>
      <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
          props.token ? (
      <Tasks tasks={props.tasks} />
     ) : (
   <h1> LOGIN FIRST TO SEE TASKS</h1>
     )
        } />
        <Route path="/newTask" exact={true} render={() =>
          props.token ? (
      <NewTask />
     ) : (
   <h1> LOGIN FIRST TO CREATE TASKS</h1>
     )
        } />
        <Route path="/users" exact={true} render={() =>
          props.token ? (
      <Users users={props.users} />
     ) : (
   <h1> LOGIN FIRST TO SEE USERS</h1>
     )
        } />
        <Route path="/tasks/:id/edit" exact={true} render={({match}) =>
        (props.edit_Task==1)?(
          <TaskEdit task={_.filter(props.tasks, (pp) =>
            match.params.id == pp.id)} task_id= {match.params.id}
           />) :
           (
             <Redirect to="/"/>
           )
        } />
        <Route path="/tasks/:id" exact={true} render={({match}) =>
            <Task task={_.filter(props.tasks, (pp) =>
              match.params.id == pp.id)} />
        } />
        <Route path="/register" exact={true} render={() =>
          <div>
        <Register />
          </div>
        } />
        <Route path="/login" exact={true} render={() =>
          props.token ? (
    <Redirect to="/"/>
     ) : (
    <LoginForm />
     )
        } />
      </div>
    </Router>
  );
});
