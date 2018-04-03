defmodule Tasktracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :timeSpent, :integer
    field :title, :string
    belongs_to :user, Tasktracker3.Users.User, foreign_key: :user_id
    belongs_to :user1, Tasktracker3.Users.User, foreign_key: :assigned

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
      |> cast(attrs, [:title, :description, :assigned, :timeSpent, :completed, :user_id])
      |> validate_required([:title, :description, :assigned, :timeSpent, :completed, :user_id])
      |> validate_timeSpent(:timeSpent)
      |> foreign_key_constraint(:user_id)
      |> foreign_key_constraint(:assigned)
  end

  def validate_timeSpent(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, timeSpent ->
      case valid_timeSpent?(timeSpent) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end


  def valid_timeSpent?(timeSpent) when rem(timeSpent,15)==0 do
    {:ok, timeSpent}
  end
  def valid_timeSpent?(_), do: {:error, "TimeSpent should be multiple of 15"}

end
