const permissionPaths = {
    "/api/permissions": {
        "post": {
            "summary": "Creates a new permission",
            "tags": ["Permissions"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Permission"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Returns a message and the created permission",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permission successfully created"
                                    },
                                    "permission": {
                                        "$ref": "#/components/schemas/Permission"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Not all required fields are given",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Not all required fields are given"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "Permission not created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permission not created"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "get": {
            "summary": "Get all permissions",
            "tags": ["Permissions"],
            "responses": {
                "200": {
                    "description": "Successfully retrieved all permissions",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Permission"
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Permissions not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permissions not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/permissions/{id}": {
        "get": {
            "summary": "Get a permission by ID",
            "tags": ["Permissions"],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "The ID of the permission to retrieve"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns the permission with the specified ID",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Permission"
                            }
                        }
                    }
                },
                "404": {
                    "description": "Permission not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permission not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "summary": "Update a permission",
            "tags": ["Permissions"],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "The ID of the permission to update"
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Permission"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Returns a message and the updated permission",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permission successfully updated"
                                    },
                                    "permission": {
                                        "$ref": "#/components/schemas/Permission"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Permission not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permission not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "summary": "Delete a permission",
            "tags": ["Permissions"],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "The ID of the permission to delete"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a message and the deleted permission",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permission successfully deleted"
                                    },
                                    "permission": {
                                        "$ref": "#/components/schemas/Permission"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Permission not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Permission not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default permissionPaths;