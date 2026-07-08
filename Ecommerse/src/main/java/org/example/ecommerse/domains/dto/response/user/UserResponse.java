package org.example.ecommerse.domains.dto.response.user;

public record UserResponse(
        Long id,
        String nombre,
        String email,
        String rol
) {}
