defmodule Tasktracker3.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
    has_many :task, Tasktracker3.Tasks.Task, on_delete: :nilify_all, foreign_key: :user_id
    has_many :task1, Tasktracker3.Tasks.Task, on_delete: :nilify_all, foreign_key: :assigned

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :password, :password_confirmation])
    |> validate_confirmation(:password, message: "Password donot match")
    |> validate_password(:password, message: "Password too short")
    |> put_pass_hash()
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, message: "Invalid format")
    |> validate_required([:email, :name, :password_hash])
    |> unique_constraint(:email)
  end

  def validate_email(email) when is_binary(email) do
      case Regex.run(~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, email) do
        nil ->
          {:error, "Invalid email"}
        [email] ->
          try do
            Regex.run(~r/(\w+)@([\w.]+)/, email) |> validate_email
          rescue
            _ -> {:error, "Invalid email"}
          end
      end
    end
  # From Comeonin docs
   def validate_password(changeset, field, options \\ []) do
     validate_change(changeset, field, fn _, password ->
       case valid_password?(password) do
         {:ok, _} -> []
         {:error, msg} -> [{field, options[:message] || msg}]
       end
     end)
   end

   def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
     change(changeset, Comeonin.Argon2.add_hash(password))
   end
   def put_pass_hash(changeset), do: changeset

   def valid_password?(password) when byte_size(password) > 7 do
     {:ok, password}
   end
   def valid_password?(_), do: {:error, "The password is too short"}

end
