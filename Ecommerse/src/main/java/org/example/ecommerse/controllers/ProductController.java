package org.example.ecommerse.controllers;

import jakarta.validation.Valid;
import org.example.ecommerse.domains.dto.request.product.ProductRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.services.product.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/productos")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<GeneralResponse> listarTodos() {
        var productos = productService.listarTodos();
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
}
