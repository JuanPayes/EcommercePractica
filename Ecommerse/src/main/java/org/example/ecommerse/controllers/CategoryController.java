package org.example.ecommerse.controllers;

import jakarta.validation.Valid;
import org.example.ecommerse.domains.dto.request.category.CategoryRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.services.category.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<GeneralResponse> listarTodas() {
        var categorias = categoryService.listarTodas();
        return ResponseEntity.ok(ResponseBuilder.build("Categorías encontradas", 200, categorias));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> buscarPorId(@PathVariable Long id) {
        var categoria = categoryService.buscarPorId(id);
        return ResponseEntity.ok(ResponseBuilder.build("Categoría encontrada", 200, categoria));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<GeneralResponse> crear(@Valid @RequestBody CategoryRequest dto) {
        var categoria = categoryService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.build("Categoría creada", 201, categoria));
    }
}
