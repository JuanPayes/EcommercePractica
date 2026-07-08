package org.example.ecommerse.domains.dto.response.auth;

import org.example.ecommerse.domains.dto.response.user.UserResponse;

public record AuthResponse(
        String token,
        String tipo,
        UserResponse usuario
) {
    public AuthResponse(String token, UserResponse usuario) {
        this(token, "Bearer", usuario);
    }
}
