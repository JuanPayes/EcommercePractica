package org.example.ecommerse.domains.dto.request.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.example.ecommerse.domains.dto.request.orderItem.OrderItemRequest;

import java.util.List;

public record OrderCreateRequest(
        @NotNull(message = "La dirección de envío es obligatoria")
        Long direccionId,

        @NotEmpty(message = "La orden debe tener al menos un producto")
        @Valid
        List<OrderItemRequest> items
) {
}
