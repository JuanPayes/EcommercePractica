package org.example.ecommerse.helpers.mappers;

import org.example.ecommerse.domains.dto.request.product.ProductRequest;
import org.example.ecommerse.domains.dto.response.product.ProductResponse;
import org.example.ecommerse.domains.entities.Product;

public class ProductMapper {

    public static ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getNombre(),
                product.getDescripcion(),
                product.getPrecio(),
                product.getStock(),
                CategoryMapper.toResponse(product.getCategory())
        );
    }

    public static Product toEntity(ProductRequest dto) {
        Product product = new Product();
        product.setNombre(dto.nombre());
        product.setDescripcion(dto.descripcion());
        product.setPrecio(dto.precio());
        product.setStock(dto.stock());
        return product;
    }
}
