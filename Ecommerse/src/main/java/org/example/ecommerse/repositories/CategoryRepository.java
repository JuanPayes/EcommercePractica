package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.Category;
import org.hibernate.validator.internal.engine.resolver.JPATraversableResolver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNombre(String nombre);

    boolean existsByNombre(String nombre);
}
