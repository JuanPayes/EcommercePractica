package org.example.ecommerse.services.category;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.category.CategoryRequest;
import org.example.ecommerse.domains.dto.response.category.CategoryResponse;
import org.example.ecommerse.domains.entities.Category;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.mappers.CategoryMapper;
import org.example.ecommerse.repositories.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional
    public CategoryResponse crear(CategoryRequest dto) {
        if (categoryRepository.existsByNombre(dto.nombre())) {
            throw new IllegalArgumentException("Ya existe una categoría con ese nombre");
        }
        Category category = CategoryMapper.toEntity(dto);
        return CategoryMapper.toResponse(categoryRepository.save(category));
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> listarTodas() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponse buscarPorId(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + id));
        return CategoryMapper.toResponse(category);
    }
}
