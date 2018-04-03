defmodule Tasktracker3Web.PageController do
  use Tasktracker3Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
