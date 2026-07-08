package org.example.ecommerse.domains.dto.request.payment;

import jakarta.validation.constraints.NotNull;

public record PaymentRequest(
        @NotNull(message = "El método de pago es obligatorio")
        String metodo
) {
}
