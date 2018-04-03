import React from 'react';
import { Link } from 'react-router';
import { Button } from 'reactstrap';


export default function Task(params) {
  let task = params.task;
  let comp= task.completed? "Completed" : "Not Completed";
  return <tr>
      <td>task.title</td>
      <td>task.description</td>
      <td>task.assigned</td>
      <td>task.timeSpent</td>
      <td>{comp}</td>

      <td class="text-right">
        <span><Link href="#" to={"/tasks/"+ task.id}  className= "btn btn-default btn-xs">SHOW</Link></span>
        <span><Link href="#" to={"/tasks/"+ task.id}  className= "btn btn-default btn-xs">EDIT</Link></span>
        <span><Button onClick={deleteTask} className= "btn btn-danger btn-xs">DELETE</Button></span>
      </td>
    </tr>
}
