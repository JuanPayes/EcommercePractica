package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.response.payment.PaymentResponse;
import org.example.ecommerse.domains.entities.Payment;

public class PaymentMapper {

    public static PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getMonto(),
                payment.getMetodo().name(),
                payment.getEstado().name(),
                payment.getFecha()
        );
    }
}
