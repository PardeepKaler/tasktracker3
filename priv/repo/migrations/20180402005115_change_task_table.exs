defmodule Tasktracker3.Repo.Migrations.ChangeTaskTable do
  use Ecto.Migration

  def change do
   alter table(:tasks) do
      remove :assigned_id
      add :assigned, references(:users, on_delete: :nothing)
    end
    end
end
