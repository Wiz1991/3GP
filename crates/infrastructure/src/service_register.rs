use std::sync::Arc;

use tracing::info;

use application::config::AppConfig;
use application::utils::security_service::DynSecurityService;
use application::utils::token_service::DynTokenService;

use crate::connection_pool::ConnectionPool;
use crate::services::utils::argon_security_service::ArgonSecurityService;
use crate::services::utils::jwt_service::JwtService;

#[derive(Clone)]
pub struct ServiceRegister {
    pub token_service: DynTokenService,
}

/// A simple service container responsible for managing the various services our API endpoints will pull from through axum extensions.
impl ServiceRegister {
    pub fn new(pool: ConnectionPool, config: Arc<AppConfig>) -> Self {
        info!("initializing utility services...");
        let security_service = Arc::new(ArgonSecurityService::new(config.clone())) as DynSecurityService;
        let token_service = Arc::new(JwtService::new(config)) as DynTokenService;

        ServiceRegister { token_service }
    }
}
