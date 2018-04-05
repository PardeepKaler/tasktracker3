import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let Session = connect(({token}) => {return {token};})((props) => {

  function logout(ev){
    props.dispatch({
      type: 'SET_TOKEN',
      token: null,
    });
  }
  return <div className="navbar-text "><p className="inline-log">
  Logged in as  { props.token.name } </p>
  <NavLink to="/" onClick={(e)=> { logout(e,props);}} href="#" className="nav-link inline-log">Logout</NavLink>
  </div>;
});

function Register_login(){
  return (
    <div className="register-login">
    <ul className="navbar-nav mr-auto">
    <NavItem>
    <NavLink to="/register" href="#" className="nav-link">Register</NavLink>
    </NavItem>
    <NavItem>
    <NavLink to="/login" href="#" className="nav-link">Login</NavLink>
    </NavItem>
    </ul>
    </div>
  )
}

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <Register_login />
  }

  function clearData(){
    props.dispatch({
      type: 'CLEAR_TASK_ERROR',
    });
    props.dispatch({
      type: 'CLEAR_TASK_FORM',
    });
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
    <span className="navbar-brand">
    TaskTracker
    </span>
    <ul className="navbar-nav mr-auto">
    <NavItem>
    <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Tasks</NavLink>
    </NavItem>
    <NavItem>
    <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
    </NavItem>
    <NavItem>
    <NavLink to="/newtask" href="#" onClick= {clearData} className="nav-link">New Task</NavLink>
    </NavItem>
    </ul>
    { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props,null,null,{pure: false})(Nav);
