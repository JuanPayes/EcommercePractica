package org.example.ecommerse.repositories;

import jakarta.persistence.criteria.Predicate;
import org.example.ecommerse.domains.entities.Product;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> conFiltros(
            Long categoriaId, BigDecimal precioMin, BigDecimal precioMax, String nombre) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (categoriaId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoriaId));
            }
            if (precioMin != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("precio"), precioMin));
            }
            if (precioMax != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("precio"), precioMax));
            }
            if (nombre != null && !nombre.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("nombre")), "%" + nombre.toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
