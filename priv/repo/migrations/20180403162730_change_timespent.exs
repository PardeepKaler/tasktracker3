defmodule Tasktracker3.Repo.Migrations.ChangeTimespent do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
       remove :timeSpent
       add :timeSpent, :integer
     end
  end
end
