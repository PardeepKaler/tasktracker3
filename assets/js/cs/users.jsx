import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import api from '../api';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'

function User(params) {
let user = params.user;
let props= params.props;


  return <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      </tr>
}
function state2props(state) {
  return {
    editTask: state.editTask,
  };
}

export default connect(state2props)(Users);



 function Users(params) {
  let users = _.map(params.users, (pp) => <User key={pp.id} user={pp} props={params} />);
  return <div>
  <table className="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th></th>
    </tr>
  </thead>
               <tbody>
                 {users}
               </tbody>
             </table>
  </div>;
}
