package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.Order;
import org.example.ecommerse.helpers.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findByUserIdOrderByFechaDesc(Long userId);

    List<Order> findByEstado(OrderStatus estado);
}
