use serde::{Deserialize, Serialize};

use crate::schemas::model::SchemaDto;

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct AssetDto {
    #[serde(skip_serializing, skip_deserializing)]
    pub id: u64,

    pub node_id: u64,

    pub schema: SchemaDto,
}
