defmodule Tasktracker3.Repo.Migrations.AddPasswordHashes do
  use Ecto.Migration

  def change do
    alter table("users") do
    add :password_hash, :string
    add :password, :string
    add :password_confirmation, :string
      end
  end
end
