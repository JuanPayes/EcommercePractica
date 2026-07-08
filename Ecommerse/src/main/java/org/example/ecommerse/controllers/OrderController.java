package org.example.ecommerse.controllers;

import jakarta.validation.Valid;
import org.example.ecommerse.domains.dto.request.order.OrderCreateRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.security.UserDetailsImpl;
import org.example.ecommerse.services.order.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ordenes")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<GeneralResponse> crear(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                 @Valid @RequestBody OrderCreateRequest dto) {
        var orden = orderService.crear(userDetails.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.build("Orden creada exitosamente", 201, orden));
    }

    @GetMapping("/mis-ordenes")
    public ResponseEntity<GeneralResponse> misOrdenes(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        var ordenes = orderService.listarPorUsuario(userDetails.getId());
        return ResponseEntity.ok(ResponseBuilder.build("Órdenes encontradas", 200, ordenes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneralResponse> buscarPorId(@PathVariable Long id,
                                                       @AuthenticationPrincipal UserDetailsImpl userDetails) {
        var orden = orderService.buscarPorIdYUsuario(id, userDetails.getId());
        return ResponseEntity.ok(ResponseBuilder.build("Orden encontrada", 200, orden));
    }
}
