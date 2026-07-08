package org.example.ecommerse.domains.dto.response.order;

import org.example.ecommerse.domains.dto.response.payment.PaymentResponse;
import org.example.ecommerse.domains.dto.response.address.AddressResponse;
import org.example.ecommerse.domains.dto.response.orderItem.OrderItemResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        String estado,
        BigDecimal total,
        LocalDateTime fecha,
        AddressResponse direccionEnvio,
        List<OrderItemResponse> items,
        PaymentResponse payment
) { }
