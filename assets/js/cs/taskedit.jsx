import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { Link } from 'react-router-dom';



function EditTask(props) {
  //console.log("props@PostForm", props);


  function handleCheck(ev){
    var newComp;
    if(props.editTask.completed) newComp=false;
    else newComp = true;
    let data ={ completed: newComp };
    let action = {
      type: 'UPDATE_EDIT_TASK_FORM',
      data: data,
    };

    console.log(action);
    props.dispatch(action);
  }

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_EDIT_TASK_FORM',
      data: data,
    };

    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    var action= {
      id: props.task_id,
      user_id: props.editTask.user_id,
      completed: props.editTask.completed,
      description: props.editTask.description,
      title: props.editTask.title,
      timeSpent: props.editTask.timeSpent,
      assigned: props.editTask.assigned,
    };
    api.update_task(action);
    console.log(action);

  }

 let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.email}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>EDIT TASK : </h2>
    <FormGroup>
      <Label for="title" >Title</Label>
      <Input type="text" name="title"
             value={props.editTask.title} onChange={update} />
 <span className="error">{props.task_error.title}</span>
    </FormGroup>
    <FormGroup>
      <Label for= "description">Description</Label>
      <Input type="textarea" name="description"
             value={props.editTask.description} onChange={update} />
    <span className="error">{props.task_error.description}</span>
    </FormGroup>
    <FormGroup>
      <Label for="assigned">Assigned To </Label>
      <Input type="select" name="assigned" value={props.editTask.assigned} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for= "timeSpent">TimeSpent</Label>
      <Input type="number" name="timeSpent" className="form-control" step="15" min="0"
             value={props.editTask.timeSpent} onChange={update} />
    <span className="error">{props.task_error.timeSpent}</span>
    </FormGroup>
    <FormGroup>
      <Label className="w1" for="completed">Completed</Label>
      <Input type="checkbox" name="completed"
             value={props.editTask.completed} onChange={handleCheck} />
    </FormGroup>
    <Button onClick={submit} color="primary">Submit</Button> &nbsp;
    <div><Link href="#"  to= "/" className="btn btn-default btn-xs">BACK</Link></div>

  </div>;
}

function state2props(state) {
  //console.log("rerender@PostForm", state);
  return {
    editTask: state.editTask,
    token: state.token,
    users: state.users,
    task_error: state.task_error,
  };
}

export default connect(state2props)(EditTask);
