import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';



function NewTask(props) {

  function handleCheck(ev){
    var newComp;
    if(props.newTask.completed) newComp=false;
    else newComp = true;
    let data ={ completed: newComp };
    let action = {
      type: 'UPDATE_TASK_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_TASK_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    var action= {
      user_id: props.token.user_id,
      completed: props.newTask.completed,
      description: props.newTask.description,
      title: props.newTask.title,
      timeSpent: props.newTask.timeSpent,
      assigned: props.newTask.assigned,
    };
    api.create_task(action);
  }

 let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.email}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>NEW TASK : </h2>
    <FormGroup>
      <Label for="title" >Title</Label>
      <Input type="text" name="title"
             value={props.newTask.title} onChange={update} />
       <span className="error">{props.task_error.title}</span>
    </FormGroup>
    <FormGroup>
      <Label for= "description">Description</Label>
      <Input type="textarea" name="description"
             value={props.newTask.description} onChange={update} />
            <span className="error">{props.task_error.description}</span>
    </FormGroup>
    <FormGroup>
      <Label for="assigned">Assigned To </Label>
      <Input type="select" name="assigned" value={props.newTask.assigned} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for= "timeSpent">TimeSpent</Label>
      <Input type="number" name="timeSpent" className="form-control" step="15" min="0"
             value={props.newTask.timeSpent} onChange={update} />
              <span className="error">{props.task_error.timeSpent}</span>
    </FormGroup>
    <FormGroup>
      <Label className="w1" for="completed">Completed</Label>
      <Input type="checkbox" name="completed"
             value={props.newTask.completed} onChange={handleCheck} />
    </FormGroup>
    <Button onClick={submit} color="primary">Submit</Button> &nbsp;

  </div>;
}

function state2props(state) {
  return {
    newTask: state.newTask,
    token: state.token,
    users: state.users,
    task_error: state.task_error,
  };
}

export default connect(state2props)(NewTask);
