package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);

    @Query("SELECT AVG(r.puntuacion) FROM Review r WHERE r.product.id = :productId")
    Double calcularPromedioPorProducto(@Param("productId") Long productId);

    long countByProductId(Long productId);
}
