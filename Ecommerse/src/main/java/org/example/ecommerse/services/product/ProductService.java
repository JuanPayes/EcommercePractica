package org.example.ecommerse.services.product;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.product.ProductRequest;
import org.example.ecommerse.domains.dto.response.product.ProductResponse;
import org.example.ecommerse.domains.entities.Category;
import org.example.ecommerse.domains.entities.Product;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.mappers.ProductMapper;
import org.example.ecommerse.repositories.CategoryRepository;
import org.example.ecommerse.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    @Transactional
    public ProductResponse crear(ProductRequest dto) {
        Category category = categoryRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + dto.categoriaId()));

        Product product = ProductMapper.toEntity(dto);
        product.setCategory(category);

        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listarTodos() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse buscarPorId(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));
        return ProductMapper.toResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> buscarPorNombre(String nombre) {
        return productRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(ProductMapper::toResponse)
                .toList();
    }
}
