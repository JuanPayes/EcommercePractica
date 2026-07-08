package org.example.ecommerse.domains.dto.response.address;

public record AddressResponse(
        Long id,
        String calle,
        String ciudad,
        String referencia,
        boolean esPrincipal
) {}
