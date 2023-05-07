#[derive(Debug, Clone, Deserialize, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct ObjectDto {
    #[serde(skip_serializing, skip_deserializing)]
    pub id: u64,

    pub name: String,

    pub url: String,

    pub created_at: u64,
    
    pub updated_at: u64,
}
