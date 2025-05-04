const userPaths = {
    "/api/user/signup": {
        "post": {
            "summary": "Register a new user",
            "tags": ["Users"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "User successfully created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User successfully created"
                                    },
                                    "user": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Username and password are required",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Username and password are required"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "User not created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User not created"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/user": {
        "get": {
            "summary": "Get all users",
            "tags": ["Users"],
            "security": [
                {
                    "cookieAuth": []
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns all users",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Users not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Users not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/user/{id}": {
        "get": {
            "summary": "Get a user by ID",
            "tags": ["Users"],
            "security": [
                {
                    "cookieAuth": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "The ID of the user to retrieve"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns the user with the specified ID",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    }
                },
                "404": {
                    "description": "User not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "summary": "Update a user",
            "tags": ["Users"],
            "security": [
                {
                    "cookieAuth": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "The ID of the user to update"
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User successfully updated",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User successfully updated"
                                    },
                                    "user": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "User not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "summary": "Delete a user",
            "tags": ["Users"],
            "security": [
                {
                    "cookieAuth": []
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "The ID of the user to delete"
                }
            ],
            "responses": {
                "200": {
                    "description": "User successfully deleted",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User successfully deleted"
                                    },
                                    "user": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "User not found",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User not found"
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

export default userPaths;