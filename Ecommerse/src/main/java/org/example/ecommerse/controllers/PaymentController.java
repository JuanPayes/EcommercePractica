package org.example.ecommerse.controllers;


import jakarta.validation.Valid;
import org.example.ecommerse.domains.dto.request.payment.PaymentRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.security.UserDetailsImpl;
import org.example.ecommerse.services.payment.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagos")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/orden/{orderId}")
    public ResponseEntity<GeneralResponse> procesarPago(@PathVariable Long orderId,
                                                        @AuthenticationPrincipal UserDetailsImpl userDetails,
                                                        @Valid @RequestBody PaymentRequest dto) {
        var pago = paymentService.procesarPago(orderId, userDetails.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.build("Pago procesado exitosamente", 201, pago));
    }
}
