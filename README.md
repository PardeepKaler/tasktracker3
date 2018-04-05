# Tasktracker3


Assumptions:

1) User cannot see tasks, other users or can create task unless he logs in.
2) User can register for his account by clicking on register button.
3) If user enters any incorrect information or invalid email format then he is shown error message.
4) There is clear button in register_form clicking on which user can clear the form.
5) On successful registering, a alert is generated stating user has registered successful and all the fields are automatically cleared.
6) User can then log in into app.Error message is shown if he enters invalid username/password.
7) On login, user can view tasks and can create new task.
8) By clicking newTask link, user can enter form fields and create new task. Error messages are shown if some field is missing. If user navigate to other link from the newTask page , then the newTask form fields are cleared. If task is created then alert is generated stating that a task has been created and all the form fields are cleared. Default timeSpent is 0 in new task form, and default assigned to is the user itself.
9) On Tasks page, user can click on show page to view task details.
10) User can delete specific task by clicking on delete button.
11) User can click on edit button to edit specific task. In the editForm page, user can make necessary changes and submit it. If task is edited then user is taken back to tasks page automatically. Otherwise an error message is shown. User can click on Back button to go back to tasks page.
12) In AllUsers link, user can see the name and email of other users.
13) User can logout by clicking on logout link.


To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
