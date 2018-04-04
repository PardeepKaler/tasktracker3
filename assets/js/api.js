import store from './store';

class TheServer {


  request_tasks() {
     $.ajax("/api/v1/tasks", {
       method: "get",
       dataType: "json",
       contentType: "application/json; charset=UTF-8",
       success: (resp) => {
         store.dispatch({
           type: 'TASKS_LIST',
           posts: resp.data,
         });
       },
     });
   }

   request_users() {
     $.ajax("/api/v1/users", {
       method: "get",
       dataType: "json",
       contentType: "application/json; charset=UTF-8",
       success: (resp) => {
         store.dispatch({
           type: 'USERS_LIST',
           users: resp.data,
         });
       },
     });
   }

  submit_register(data) {
    store.dispatch({
      type: 'CLEAR_REGISTER_ERROR',
    });
      $.ajax("/api/v1/users", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ user: data }),
        success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
        alert("User created Successfully");
        store.dispatch({
          type: 'CLEAR_FORM',
        });
        },
        error: (resp) => {
          store.dispatch({
            type: 'UPDATE_REGISTER_ERROR',
            data: resp.responseJSON.errors,
          });
        }
      });
    }

    create_task(data) {
      store.dispatch({
        type: 'CLEAR_TASK_ERROR',
      });

        $.ajax("/api/v1/tasks", {
          method: "post",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({ task: data }),
          success: (resp) => {
            store.dispatch({
              type: 'ADD_TASK',
              task: resp.data,
            });
            alert("Task Has been created");
            store.dispatch({
              type: 'CLEAR_TASK_FORM',
            });
          },
          error: (resp) => {
            store.dispatch({
              type: 'UPDATE_TASK_ERROR',
              data: resp.responseJSON.errors,
            });
          }
        });
      }

      update_task(data) {
        store.dispatch({
          type: 'CLEAR_TASK_ERROR',
        });

          $.ajax("/api/v1/tasks/"+data.id, {
            method: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({id: data.id, task: {
              title: data.title, description: data.description,  user_id: data.user_id, assigned: data.assigned,
              timeSpent: data.timeSpent, completed: data.completed,
            } }),
            success: (resp) => {
            store.dispatch({
              type: 'DELETE_TASK',
              id: data.id,
            });
            store.dispatch({
              type: 'ADD_TASK',
              task: resp.data,
            });
         let action1 = {
           type: 'SET_EDIT',
           data: null,
         };
         store.dispatch(action1);
            },
            error: (resp) => {
              store.dispatch({
                type: 'UPDATE_TASK_ERROR',
                data: resp.responseJSON.errors,
              });
            }
          });
        }

      delete_Task(data) {
          $.ajax("/api/v1/tasks/"+data.id, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ id: data.id }),
            success: (resp) => {
              store.dispatch({
                type: 'DELETE_TASK',
                id: data.id,
              });
            },
          });
        }

  submit_login(data) {

    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
        store.dispatch({
          type: 'UPDATE_TASK_FORM',
          data: {assigned: resp.user_id},
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'UPDATE_LOGIN_ERROR',
          data: {name: 'Invalid Email/Password Combination'},
        });
      }
    });
  }
}

export default new TheServer();
