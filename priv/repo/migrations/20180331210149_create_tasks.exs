defmodule Tasktracker3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :text, null: false
      add :description, :text, null: false
      add :timeSpent, :decimal, null: false
      add :completed, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nothing)
      add :assigned_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
