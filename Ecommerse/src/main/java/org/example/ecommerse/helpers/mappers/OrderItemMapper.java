package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.response.orderItem.OrderItemResponse;
import org.example.ecommerse.domains.entities.OrderItem;

public class OrderItemMapper {

    public static OrderItemResponse toResponse(OrderItem item) {
        return new OrderItemResponse(
                item.getId(),
                ProductMapper.toResponse(item.getProduct()),
                item.getCantidad(),
                item.getPrecioUnitario(),
                item.getPrecioUnitario().multiply(java.math.BigDecimal.valueOf(item.getCantidad()))
        );
    }
}
