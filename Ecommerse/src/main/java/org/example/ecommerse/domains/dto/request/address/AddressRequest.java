package org.example.ecommerse.domains.dto.request.address;

import jakarta.validation.constraints.NotBlank;

public record AddressRequest(
        @NotBlank(message = "La calle es obligatoria")
        String calle,

        @NotBlank(message = "La ciudad es obligatoria")
        String ciudad,

        String referencia,

        boolean esPrincipal
) {}
