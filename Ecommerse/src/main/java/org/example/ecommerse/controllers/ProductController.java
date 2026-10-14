package org.example.ecommerse.controllers;

import jakarta.validation.Valid;
import org.example.ecommerse.domains.dto.request.product.ProductRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.services.product.ProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/productos")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<GeneralResponse> listarTodos(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(required = false) String nombre,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id") String sortBy
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        var productos = productService.listarTodos(categoriaId, precioMin, precioMax, nombre, pageable);
        return ResponseEntity.ok(ResponseBuilder.build("Productos encontrados", 200, productos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> buscarPorId(@PathVariable Long id) {
        var producto = productService.buscarPorId(id);
        return ResponseEntity.ok(ResponseBuilder.build("Producto encontrado", 200, producto));
    }

    @GetMapping("/buscar")
    public ResponseEntity<GeneralResponse> buscarPorNombre(@RequestParam String nombre) {
        var productos = productService.buscarPorNombre(nombre);
        return ResponseEntity.ok(ResponseBuilder.build("Resultados de búsqueda", 200, productos));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<GeneralResponse> crear(@Valid @RequestBody ProductRequest dto) {
        var producto = productService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.build("Producto creado", 201, producto));
    }

    @GetMapping("/mejor-calificados")
    public ResponseEntity<GeneralResponse> mejorCalificados(@RequestParam(defaultValue = "10") int limit) {
        var productos = productService.obtenerMejorCalificados(limit);
        return ResponseEntity.ok(ResponseBuilder.build("Productos mejor calificados", 200, productos));
    }

    @GetMapping("/tendencia")
    public ResponseEntity<GeneralResponse> tendencia(@RequestParam(defaultValue = "10") int limit) {
        var productos = productService.obtenerTendencia(limit);
        return ResponseEntity.ok(ResponseBuilder.build("Productos en tendencia", 200, productos));
    }
}
