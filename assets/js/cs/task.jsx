import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task(params) {
  let task = params.task[0];
  let comp= task.completed? "Task Completed" : "Task Not Completed"
  return <Card>
    <CardBody>
      <div>
        <p>Title : <b>{ task.title }</b></p>
        <p>Description : <b>{ task.description }</b></p>
        <p>Created By : <b>{ task.user_email }</b></p>
        <p>Assigned : <b>{ task.assigned }</b></p>
        <p>Completed : <b>{ comp }</b></p>
        <p>TimeSpent : <b>{ task.timeSpent }</b></p>
      </div>
      <Link href="#"  to= "/" className="btn btn-default btn-xs">BACK</Link>
    </CardBody>
  </Card>;
}
