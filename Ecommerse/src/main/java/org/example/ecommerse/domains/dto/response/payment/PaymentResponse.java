package org.example.ecommerse.domains.dto.response.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentResponse(
        Long id,
        BigDecimal monto,
        String metodo,
        String estado,
        LocalDateTime fecha
) {
}
