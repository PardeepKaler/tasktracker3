import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';


function LoginForm(props) {
  //console.log("props@PostForm", props);

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }


  return <div style={{padding: "4ex"}}>
    <h2>LOGIN : </h2>
<span className="error">{props.login_error.name}</span>
    <FormGroup>
      <Label for="name">Email</Label>
      <Input type="email" name="name" placeholder="user@example.com"
             value={props.login.name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="pass">Password</Label>
      <Input type="password" name="pass"
             value={props.login.pass} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Login</Button> &nbsp;

  </div>;
}

function state2props(state) {
  //console.log("rerender@PostForm", state);
  return {
    login: state.login,
    login_error: state.login_error,
  };
}

export default connect(state2props)(LoginForm);
