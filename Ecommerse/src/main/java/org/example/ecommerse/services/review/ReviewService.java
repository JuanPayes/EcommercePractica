package org.example.ecommerse.services.review;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.review.ReviewRequest;
import org.example.ecommerse.domains.dto.response.review.ProductRatingResponse;
import org.example.ecommerse.domains.dto.response.review.ReviewResponse;
import org.example.ecommerse.domains.entities.Product;
import org.example.ecommerse.domains.entities.Review;
import org.example.ecommerse.domains.entities.User;
import org.example.ecommerse.exceptions.DuplicateReviewException;
import org.example.ecommerse.exceptions.ProductNotPurchasedException;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.enums.OrderStatus;
import org.example.ecommerse.helpers.mappers.ReviewMapper;
import org.example.ecommerse.repositories.OrderItemRepository;
import org.example.ecommerse.repositories.ProductRepository;
import org.example.ecommerse.repositories.ReviewRepository;
import org.example.ecommerse.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;


    @Transactional
    public ReviewResponse crear(Long userId, ReviewRequest dto) {
        boolean compro = orderItemRepository.existsByProduct_IdAndOrder_UserIdAndOrder_Estado(
                dto.productoId(), userId, OrderStatus.PAID);

        if (!compro) {
            throw new ProductNotPurchasedException(
                    "Solo puedes calificar productos que hayas comprado y pagado");
        }

        if (reviewRepository.existsByUserIdAndProductId(userId, dto.productoId())) {
            throw new DuplicateReviewException(
                    "Ya has calificado este producto anteriormente");
        }

        Product product = productRepository.findById(dto.productoId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setPuntuacion(dto.puntuacion());
        review.setComentario(dto.comentario());

        return ReviewMapper.toResponse(reviewRepository.save(review));
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> listarPorProducto(Long productId) {
        return reviewRepository.findByProductId(productId).stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductRatingResponse obtenerRating(Long productId) {
        Double promedio = reviewRepository.calcularPromedioPorProducto(productId);
        long total = reviewRepository.countByProductId(productId);

        return new ProductRatingResponse(
                productId,
                promedio != null ? Math.round(promedio * 10) / 10.0 : 0.0,
                total
        );
    }
}
