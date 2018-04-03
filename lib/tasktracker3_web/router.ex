defmodule Tasktracker3Web.Router do
  use Tasktracker3Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Tasktracker3Web do
    pipe_through :browser # Use the default browser stack
"/tasks/:id/edit"
    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasks", PageController, :index
    get "/register", PageController, :index
    get "/newtask", PageController, :index
    get "/login", PageController, :index
    get "/tasks/:id/edit", PageController, :index
    get "/tasks/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Tasktracker3Web do
  #   pipe_through :api
  # end
  scope "/api/v1", Tasktracker3Web do
      pipe_through :api
      resources "/users", UserController, except: [:new, :edit]
      resources "/tasks", TaskController, except: [:new, :edit]
      post "/token", TokenController, :create
    end


end
