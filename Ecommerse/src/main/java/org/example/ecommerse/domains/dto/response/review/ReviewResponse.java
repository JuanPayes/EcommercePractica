package org.example.ecommerse.domains.dto.response.review;

import java.time.LocalDateTime;

public record ReviewResponse(
        Long id,
        Long productoId,
        String usuarioNombre,
        Integer puntuacion,
        String comentario,
        LocalDateTime fecha
) {}
