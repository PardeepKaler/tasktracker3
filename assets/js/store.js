import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  state layout:
 *  {
 *   posts: [... Posts ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: null,
 *     body: "",
 *   }
 * }
 *
 * */

 function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.posts];
  case 'ADD_TASK':
    return [action.task, ...state];
  case 'DELETE_TASK' :
  return state.filter(tt => tt.id!=action.id);
  default:
    return state;
  }
}


function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
    case 'ADD_USER':
      return [action.user, ...state];
  default:
    return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

function edit_Task(state = null, action) {
  switch (action.type) {
    case 'SET_EDIT':
      return action.data;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_task = {
  user_id: "",
  title: "",
  description: "",
  timeSpent: 0,
  completed: false,
  assigned: "",
}

function newTask(state = empty_task, action) {
  switch (action.type) {
    case 'UPDATE_TASK_FORM':
      return Object.assign({}, state, action.data);
      case 'CLEAR_TASK_FORM':
      return empty_task;
    default:
      return state;
  }
}

let empty_edit_task = {
  user_id: "",
  title: "",
  description: "",
  timeSpent: 0,
  completed: "",
  assigned: "",
}

function editTask(state = empty_task, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_TASK_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_register = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function register(state = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.data);
      case 'CLEAR_FORM':
      return empty_register;
    default:
      return state;
  }
}

let empty_register_error = {
  email: "",
  name: "",
  password_hash: "",
  password_confirmation: "",
  password: "",
};

let empty_login_error ={
  name: "",
}
let empty_task_error ={
  timeSpent: "",
  description: "",
  title: "",
}

function task_error(state = empty_task_error, action){
  switch (action.type) {
    case 'UPDATE_TASK_ERROR':
      return Object.assign({}, state, action.data);
      case 'CLEAR_TASK_ERROR':
      return empty_task_error;
    default:
      return state;
  }
}

function register_error(state = empty_register_error, action){
  switch (action.type) {
    case 'UPDATE_REGISTER_ERROR':
      return Object.assign({}, action.data);
      case 'CLEAR_REGISTER_ERROR':
      return empty_register_error;
    default:
      return state;
  }
}

function login_error(state = empty_register_error, action){
  switch (action.type) {
    case 'UPDATE_LOGIN_ERROR':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  let reducer = combineReducers({token, login, register,tasks,users,register_error,login_error,newTask,task_error,editTask,edit_Task});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
