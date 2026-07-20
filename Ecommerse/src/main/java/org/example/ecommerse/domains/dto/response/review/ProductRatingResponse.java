package org.example.ecommerse.domains.dto.response.review;

public record ProductRatingResponse(
        Long productoId,
        Double promedioCalificacion,
        Long totalResenas
) {}
