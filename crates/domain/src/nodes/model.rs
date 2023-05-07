use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq)]
pub struct Vector3D {
    pub x: u64,
    pub y: u64,
    pub z: u64,
}

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct NodeDto {
    #[serde(skip_serializing, skip_deserializing)]
    pub id: u64,

    pub object_id: u64,

    pub position: Vector3D,
}
