import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';



function Register(props) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_register(props.register);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
    props.dispatch({
      type: 'CLEAR_REGISTER_ERROR',
    });
  }


  return <div style={{padding: "4ex"}}>
    <h2>REGISTER : </h2>
    <FormGroup>
      <Label for="name" >Name</Label>
      <Input type="text" name="name" className="form-control"
             value={props.register.name} onChange={update} />
      <span className="error">{props.register_error.name}</span>
    </FormGroup>
    <FormGroup>
      <Label for= "email">Email</Label>
      <Input type="email" name="email" placeholder="user@example.com" className="form-control"
             value={props.register.email} onChange={update}  />
             <span className="error">{props.register_error.email}</span>
    </FormGroup>
    <FormGroup>
      <Label for= "password">Password</Label>
      <Input type="password" name="password" className="form-control"
             value={props.register.password} onChange={update} />
            <span className="error">{props.register_error.password}</span>
    </FormGroup>
    <FormGroup>
      <Label for="password_confirmation">Password Confirmation</Label>
      <Input type="password" name="password_confirmation" className="form-control"
             value={props.register.password_confirmation} onChange={update} />
             <span className="error">{props.register_error.password_confirmation}</span>
    </FormGroup>
    <Button onClick={submit} color="primary">Register</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  return {
    register: state.register,
    register_error: state.register_error,
  };
}

export default connect(state2props)(Register);
