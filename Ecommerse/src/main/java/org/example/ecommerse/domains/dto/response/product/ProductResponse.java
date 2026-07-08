package org.example.ecommerse.domains.dto.response.product;

import org.example.ecommerse.domains.dto.response.category.CategoryResponse;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String nombre,
        String descripcion,
        BigDecimal precio,
        Integer stock,
        CategoryResponse categoria
) {
}
