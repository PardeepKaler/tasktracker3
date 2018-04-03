defmodule Tasktracker3Web.TaskView do
  use Tasktracker3Web, :view
  alias Tasktracker3Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
     assigned= if(Tasktracker3.Users.get_user(task.assigned)) do Tasktracker3.Users.get_user(task.assigned).email
   else "NOT ASSIGNED" end
    assigned_id = if(Tasktracker3.Users.get_user(task.assigned)) do Tasktracker3.Users.get_user(task.assigned).id
  else "" end
  user_email= Tasktracker3.Users.get_user(task.user_id).email
    %{id: task.id,
      title: task.title,
      description: task.description,
      timeSpent: task.timeSpent,
      completed: task.completed,
      user_id: task.user_id,
      assigned: assigned,
      assigned_id: assigned_id,
      user_email: user_email,
     }
  end
end
