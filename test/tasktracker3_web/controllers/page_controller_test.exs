defmodule Tasktracker3Web.PageControllerTest do
  use Tasktracker3Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end
end
