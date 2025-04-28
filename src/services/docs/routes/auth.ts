const authPaths = {
    "/api/auth/login": {
        "post": {
            "summary": "Login a user with username and password",
            "tags": ["Auth"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "The username of the user",
                                    "example": "johndoe"
                                },
                                "password": {
                                    "type": "string",
                                    "description": "The password of the user",
                                    "example": "password123"
                                }
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Returns a message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User logged in"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Returns a message",
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
                    "description": "Returns a message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Invalid credentials"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/auth/logout": {
        "get": {
            "summary": "Logout the current user",
            "tags": ["Auth"],
            "responses": {
                "200": {
                    "description": "Returns a message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "User logged out"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Returns a message",
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
    },
    "/api/auth/refresh-token": {
        "post": {
            "summary": "Refresh the access token using the refresh token",
            "tags": ["Auth"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "refreshToken": {
                                    "type": "string",
                                    "description": "The refresh token",
                                    "example": "abcdef1234567890"
                                }
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Returns a message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Tokens refreshed successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Returns a message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Invalid token payload"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Returns a message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Refresh token not found || User not found"
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

export default authPaths;