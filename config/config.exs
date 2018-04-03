# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tasktracker3,
  ecto_repos: [Tasktracker3.Repo]

# Configures the endpoint
config :tasktracker3, Tasktracker3Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "4xd/3WAFYZAY1LM5aP6tNizct2aFx4UZJZHmrHeKqVvEcAcaj3E4/R19l5+uc+cN",
  render_errors: [view: Tasktracker3Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Tasktracker3.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
