mod endpoints;
mod extractors;
mod router;

use anyhow::Context;
use application::config::AppConfig;
use clap::Parser;
use infrastructure::connection_pool::ConnectionManager;
use infrastructure::service_register::ServiceRegister;
use router::ApplicationController;
use std::sync::Arc;
use tracing::info;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();

    let config = Arc::new(AppConfig::parse());

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(&config.rust_log))
        .with(tracing_subscriber::fmt::layer())
        .init();

    info!("environment loaded and configuration parsed, initializing Postgres connection and running migrations...");
    let pg_pool = ConnectionManager::new_pool(&config.database_url, config.run_migrations)
        .await
        .expect("could not initialize the database connection pool");

    let port = config.port;
    let service_register = ServiceRegister::new(pg_pool, config.clone());

    // if config.seed {
    //     info!("seeding enabled, creating test data...");
    //     ConduitSeedService::new(service_register.clone())
    //         .seed()
    //         .await
    //         .expect("unexpected error occurred while seeding application data");
    // }

    info!("migrations successfully ran, initializing axum server...");
    ApplicationController::serve(port, &config.cors_origin, service_register)
        .await
        .context("failed to start server")?;

    Ok(())
}
