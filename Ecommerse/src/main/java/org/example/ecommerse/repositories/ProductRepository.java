package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    Page<Product> findByCategory_Id(Long categoryId, Pageable pageable);

    List<Product> findByNombreContainingIgnoreCase(String nombre);

    List<Product> findByStockGreaterThan(Integer stock);

    @Modifying
    @Query("UPDATE Product p SET p.stock = p.stock - :cantidad WHERE p.id = :id AND p.stock >= :cantidad")
    int descontarStock(@Param("id") Long id, @Param("cantidad") Integer cantidad);

    @Query("""
    SELECT p FROM Product p
    JOIN Review r ON r.product = p
    GROUP BY p
    HAVING COUNT(r) >= 3
    ORDER BY AVG(r.puntuacion) DESC
    """)
    List<Product> findMejorCalificados(Pageable pageable);

    @Modifying
    @Query("UPDATE Product p SET p.stock = p.stock + :cantidad WHERE p.id = :id")
    void restaurarStock(@Param("id") Long id, @Param("cantidad") Integer cantidad);
}
