package org.example.ecommerse.services.product;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.product.ProductRequest;
import org.example.ecommerse.domains.dto.response.PageResponse;
import org.example.ecommerse.domains.dto.response.product.ProductResponse;
import org.example.ecommerse.domains.entities.Category;
import org.example.ecommerse.domains.entities.Product;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.mappers.ProductMapper;
import org.example.ecommerse.repositories.CategoryRepository;
import org.example.ecommerse.repositories.OrderItemRepository;
import org.example.ecommerse.repositories.ProductRepository;
import org.example.ecommerse.repositories.ProductSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderItemRepository orderItemRepository;

    @Transactional
    public ProductResponse crear(ProductRequest dto) {
        Category category = categoryRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + dto.categoriaId()));

        Product product = ProductMapper.toEntity(dto);
        product.setCategory(category);

        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> listarTodos(
            Long categoriaId, BigDecimal precioMin, BigDecimal precioMax, String nombre, Pageable pageable) {

        Specification<Product> spec = ProductSpecification.conFiltros(categoriaId, precioMin, precioMax, nombre);
        Page<Product> productos = productRepository.findAll(spec, pageable);
        return PageResponse.from(productos.map(ProductMapper::toResponse));
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

    @Transactional(readOnly = true)
    public List<ProductResponse> obtenerMejorCalificados(int limit) {
        List<Product> productos = productRepository.findMejorCalificados(PageRequest.of(0, limit));
        return productos.stream().map(ProductMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> obtenerTendencia(int limit) {
        LocalDateTime desde = LocalDateTime.now().minusHours(48);
        List<Product> productos = orderItemRepository.findTendencia(desde, PageRequest.of(0, limit));
        return productos.stream().map(ProductMapper::toResponse).toList();
    }

    @Transactional
    public void restaurarStock(Long productId, Integer cantidad) {
        productRepository.restaurarStock(productId, cantidad);
    }
}
