defmodule Tasktracker3.Repo.Migrations.PasswordHashes do
  use Ecto.Migration

  def change do
   alter table(:users) do
      remove :password
      remove :password_confirmation
    end
    end
end
