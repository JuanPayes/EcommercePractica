package org.example.ecommerse.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.review.ReviewRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.security.UserDetailsImpl;
import org.example.ecommerse.services.review.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<GeneralResponse> crear(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                 @Valid @RequestBody ReviewRequest dto) {
        var review = reviewService.crear(userDetails.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.build("Review creada exitosamente", 201, review));
    }

    @GetMapping("/producto/{productId}")
    public ResponseEntity<GeneralResponse> listarPorProducto(@PathVariable Long productId) {
        var reviews = reviewService.listarPorProducto(productId);
        return ResponseEntity.ok(ResponseBuilder.build("Reviews encontradas", 200, reviews));
    }

    @GetMapping("/producto/{productId}/rating")
    public ResponseEntity<GeneralResponse> obtenerRating(@PathVariable Long productId) {
        var rating = reviewService.obtenerRating(productId);
        return ResponseEntity.ok(ResponseBuilder.build("Rating calculado", 200, rating));
    }
}
