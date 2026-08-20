package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.OrderItem;
import org.example.ecommerse.domains.entities.Product;
import org.example.ecommerse.helpers.enums.OrderStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long orderId);
    boolean existsByProduct_IdAndOrder_UserIdAndOrder_Estado(Long productId, Long userId, OrderStatus estado);
    @Query("""
    SELECT oi.product FROM OrderItem oi
    WHERE oi.order.estado = org.example.ecommerse.helpers.enums.OrderStatus.PAID
    AND oi.order.fecha >= :desde
    GROUP BY oi.product
    ORDER BY SUM(oi.cantidad) DESC
    """)
    List<Product> findTendencia(@Param("desde") LocalDateTime desde, Pageable pageable);
}
