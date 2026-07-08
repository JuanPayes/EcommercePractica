package org.example.ecommerse.domains.dto.response.orderItem;

import org.example.ecommerse.domains.dto.response.product.ProductResponse;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        ProductResponse producto,
        Integer cantidad,
        BigDecimal precioUnitario,
        BigDecimal subtotal
) {
}
