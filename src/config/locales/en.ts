export const en: AppMessage = {
    OK: "Ok",
    SERVER_ERROR: "Server could not handle the request",
    CATALOG_UNAUTHENTICATED: "Unauthenticated",
    PASSWORD_LENGTH: "Password must be at least eight characters",
    CATALOG_INVALID_ID: "Catalog Id is not found",
    CATALOG_DATA_NOT_VALID: "Catalog Data is not valid",
    CATALOG_CREATE_SUCCESS: "Catalog created successfully",
    CATALOG_CREATE_FAILED: "Catalog creation failed",
    CATALOG_GET_ALL_SUCCESS: "Catalog(s) retrieved successfully",
    CATALOG_GET_ONE_SUCCESS: "Catalog retrieved successfully",
    CATALOG_DELETE_SUCCESS: "Catalog deleted successfully",
    CATALOG_UPDATE_SUCCESS: "Catalog updated successfully",
    CATALOG_NOT_FOUND: "Catalog not found",
    VARIANT_SKU_EXIST: "SKU variant already exist",
     
};


interface AppMessage {
    [key: string]: string;
}