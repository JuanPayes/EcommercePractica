package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.OrderItem;
import org.example.ecommerse.helpers.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long orderId);
    boolean existsByProduct_IdAndOrder_UserIdAndOrder_Estado(Long productId, Long userId, OrderStatus estado);
}
