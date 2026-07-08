package org.example.ecommerse.services.order;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.order.OrderCreateRequest;
import org.example.ecommerse.domains.dto.request.orderItem.OrderItemRequest;
import org.example.ecommerse.domains.dto.response.order.OrderResponse;
import org.example.ecommerse.domains.entities.*;
import org.example.ecommerse.exceptions.InsufficientStockException;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.mappers.OrderMapper;
import org.example.ecommerse.repositories.AddressRepository;
import org.example.ecommerse.repositories.OrderRepository;
import org.example.ecommerse.repositories.ProductRepository;
import org.example.ecommerse.repositories.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;


    @Transactional
    public OrderResponse crear(Long userId, OrderCreateRequest dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Address direccion = addressRepository.findById(dto.direccionId())
                .orElseThrow(() -> new ResourceNotFoundException("Dirección no encontrada"));

        Order order = new Order();
        order.setUser(user);
        order.setDireccionEnvio(direccion);

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : dto.items()) {
            Product product = productRepository.findById(itemRequest.productoId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Producto no encontrado con id: " + itemRequest.productoId()));

            if (product.getStock() < itemRequest.cantidad()) {
                throw new InsufficientStockException(
                        "Stock insuficiente para el producto: " + product.getNombre() +
                                ". Disponible: " + product.getStock() + ", solicitado: " + itemRequest.cantidad());
            }

            // Descuenta el stock de forma atómica (evita condiciones de carrera)
            int filasActualizadas = productRepository.descontarStock(product.getId(), itemRequest.cantidad());
            if (filasActualizadas == 0) {
                throw new InsufficientStockException(
                        "El stock cambió antes de completar la compra para: " + product.getNombre());
            }
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setCantidad(itemRequest.cantidad());
            item.setPrecioUnitario(product.getPrecio()); // precio congelado al momento de compra

            items.add(item);
            total = total.add(product.getPrecio().multiply(BigDecimal.valueOf(itemRequest.cantidad())));
        }

        order.setItems(items);
        order.setTotal(total);

        Order guardado = orderRepository.save(order);
        return OrderMapper.toResponse(guardado);
    }

    @Transactional(readOnly = true)
    public OrderResponse buscarPorId(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orden no encontrada con id: " + id));
        return OrderMapper.toResponse(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> listarPorUsuario(Long userId) {
        return orderRepository.findByUserIdOrderByFechaDesc(userId).stream()
                .map(OrderMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse buscarPorIdYUsuario(Long id, Long userId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orden no encontrada con id: " + id));

        if (!order.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("No tienes permiso para ver esta orden");
        }

        return OrderMapper.toResponse(order);
    }
}
