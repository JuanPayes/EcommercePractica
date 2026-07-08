package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.response.orderItem.OrderItemResponse;
import org.example.ecommerse.domains.dto.response.order.OrderResponse;
import org.example.ecommerse.domains.entities.Order;

import java.util.List;

public class OrderMapper {

    public static OrderResponse toResponse(Order order) {
        List<OrderItemResponse> itemsResponse = order.getItems().stream()
                .map(OrderItemMapper::toResponse)
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getEstado().name(),
                order.getTotal(),
                order.getFecha(),
                AddressMapper.toResponse(order.getDireccionEnvio()),
                itemsResponse,
                order.getPayment() != null ? PaymentMapper.toResponse(order.getPayment()) : null
        );
    }
}
