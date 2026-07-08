package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.response.user.UserResponse;
import org.example.ecommerse.domains.entities.User;

public class UserMapper {

    public static UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getNombre(),
                user.getEmail(),
                user.getRol().name()
        );
    }
}
