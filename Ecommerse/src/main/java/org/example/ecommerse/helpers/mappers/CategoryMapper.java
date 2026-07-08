package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.request.category.CategoryRequest;
import org.example.ecommerse.domains.dto.response.category.CategoryResponse;
import org.example.ecommerse.domains.entities.Category;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getNombre()
        );
    }

    public static Category toEntity(CategoryRequest dto) {
        Category category = new Category();
        category.setNombre(dto.nombre());
        return category;
    }
}
