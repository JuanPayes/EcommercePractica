package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.response.review.ReviewResponse;
import org.example.ecommerse.domains.entities.Review;

public class ReviewMapper {

    public static ReviewResponse toResponse(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getProduct().getId(),
                review.getUser().getNombre(),
                review.getPuntuacion(),
                review.getComentario(),
                review.getFecha()
        );
    }
}
