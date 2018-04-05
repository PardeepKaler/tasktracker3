import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import api from '../api';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'

function Task(params) {
  let task = params.task;
  let props= params.props;
  function deleteTask(ev) {
    api.delete_Task(task);
  }

  function editTask(e,props) {

    let data = {
      user_id: task.user_id,
      completed: task.completed,
      description: task.description,
      title: task.title,
      timeSpent: task.timeSpent,
      assigned: task.assigned_id,
    }
    let action = {
      type: 'UPDATE_EDIT_TASK_FORM',
      data: data,
    };

    props.dispatch(action);

  }

  let comp= task.completed? "Completed" : "Not Completed";

  return <tr>
  <td>{task.title}</td>
  <td>{task.description}</td>
  <td>{task.assigned}</td>
  <td>{task.timeSpent}</td>
  <td>{comp}</td>

  <td className="text-right w3">
  <div>  <span className="inline-log"><Link href="#"  to={"/tasks/"+ task.id} className="btn btn-default btn-xs">SHOW</Link></span>
  <span className="inline-log"><NavLink href="#" onClick={(e)=> { editTask(e,props);}} to={"/tasks/"+ task.id+"/edit"} className="nav-link">EDIT</NavLink></span>
  <span className="inline-log"><Button to="/users" onClick={deleteTask} className= "btn btn-danger btn-xs">DELETE</Button></span> </div>
  </td></tr>
}
function state2props(state) {
  return {
    editTask: state.editTask,
  };
}

export default connect(state2props)(Tasks);



function Tasks(params) {
  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} task={pp} props={params} />);
  let action1 = {
    type: 'SET_EDIT',
    data: 1,
  };
  params.dispatch(action1);
  return <div>
  <table className="table">
  <thead>
  <tr>
  <th className="w1">Title</th>
  <th className="w2">Description</th>
  <th className="w1">Assigned</th>
  <th className="w1">Timespent(In Minutes)</th>
  <th className="w1">Completed</th>

  <th></th>
  </tr>
  </thead>
  <tbody>
  {tasks}
  </tbody>
  </table>
  </div>;
}
