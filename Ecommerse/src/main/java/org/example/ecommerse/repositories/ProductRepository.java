package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByNombreContainingIgnoreCase(String nombre);

    List<Product> findByStockGreaterThan(Integer stock);

    @Modifying
    @Query("UPDATE Product p SET p.stock = p.stock - :cantidad WHERE p.id = :id AND p.stock >= :cantidad")
    int descontarStock(@Param("id") Long id, @Param("cantidad") Integer cantidad);
}
