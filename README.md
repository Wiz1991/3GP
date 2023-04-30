To get started, install [Docker](https://www.docker.com/) and [cargo-make](https://github.com/sagiegurari/cargo-make)
on your local machine (Windows users may want to use WSL for ease of development), then clone/fork the repository. Once
you have the project
local to your machine, create an `.env` file local to workspace with valid values (you can use the defaults as well).

```bash
cp .env.example .env
```

Next, create and start our Docker containers:

```bash
cargo make docker
```

Once the application containers have started, verify all integration tests pass:

```bash
cargo make integration
```

Again, the target above will run all included unit tests found in the project. To run the frontend project

```bash
cargo make web
```

## Project Structure

We utilize [cargo workspaces](https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html) to help encapsulate
project-specific logic/domains, with a rough organization strategy as follows:

- `crates/conduit-bin` - API entry point, consisting of a single `main.rs` file to drive startup and wire library
  dependencies together
- `crates/web` - web frontend project utilizing Next.js
- `crates/api` - web API project housing axum specific setup, endpoints, routing, request/response marshalling,
  etc.
- `crates/application` - application logic and contract definitions between domains, services, and repository
- `crates/domain` - a simple project to house PORS (plain old rust structs) used for API request and responses,
  services, etc.
- `crates/infrastructure` - a project adapter containing implementations of the application business logics definitions
  from
  higher up
- `integrations` - contains the RealWorld Postman test scripts and collection
- `cypress` - contains the e2e tests used to test the frontend project (`crates/web`)
- `deploy` - contains all Docker Compose files used for building the project containers
- `.husky` - contains husky git hooks

## Using Docker

The project utilizes Docker containers for Postgres and Prometheus metrics, as well as containers for the API and frontend. For example, when starting the
application with `cargo make docker`, navigating to `localhost:9090` will bring you to the Prometheus metrics page.
From there, running integration tests with `cargo make integration` to simulate traffic to the API allows one to observe
the
various
metrics that are recorded in the service layer: request count, request latency, and histograms of service request
intervals.

To start the API outside the Docker context, run:

```bash
cargo make dev # or cargo run
```

The `dev` tasks takes on the `postgres` task as a dependency, so your database container will start automatically.
