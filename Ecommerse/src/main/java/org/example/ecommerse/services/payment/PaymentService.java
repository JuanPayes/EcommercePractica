package org.example.ecommerse.services.payment;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.payment.PaymentRequest;
import org.example.ecommerse.domains.dto.response.payment.PaymentResponse;
import org.example.ecommerse.domains.entities.Order;
import org.example.ecommerse.domains.entities.Payment;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.enums.OrderStatus;
import org.example.ecommerse.helpers.enums.PaymentMethod;
import org.example.ecommerse.helpers.enums.PaymentStatus;
import org.example.ecommerse.helpers.mappers.PaymentMapper;
import org.example.ecommerse.repositories.OrderRepository;
import org.example.ecommerse.repositories.PaymentRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public PaymentResponse procesarPago(Long orderId, long userId, PaymentRequest dto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Orden no encontrada con id: " + orderId));

        if (!order.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("No tienes permiso para ver esta orden");
        }

        if (order.getEstado() != OrderStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Esta orden no puede ser pagada porque su estado actual es: " + order.getEstado());
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setMonto(order.getTotal()); // el monto viene de la orden, no del cliente
        payment.setMetodo(PaymentMethod.valueOf(dto.metodo()));
        payment.setEstado(PaymentStatus.COMPLETED); // simulado; aquí iría la integración real con una pasarela

        Payment guardado = paymentRepository.save(payment);

        order.setEstado(OrderStatus.PAID);
        orderRepository.save(order);

        return PaymentMapper.toResponse(guardado);
    }
}
