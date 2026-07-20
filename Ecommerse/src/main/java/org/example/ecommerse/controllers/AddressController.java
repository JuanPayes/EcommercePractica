package org.example.ecommerse.controllers;

import jakarta.validation.Valid;
import org.example.ecommerse.domains.dto.request.address.AddressRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.security.UserDetailsImpl;
import org.example.ecommerse.services.address.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/direcciones")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity<GeneralResponse> crear(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                 @Valid @RequestBody AddressRequest dto) {
        var direccion = addressService.crear(userDetails.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.build("Dirección creada", 201, direccion));
    }

    @GetMapping("/mis-direcciones")
    public ResponseEntity<GeneralResponse> misDirecciones(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        var direcciones = addressService.listarPorUsuario(userDetails.getId());
        return ResponseEntity.ok(ResponseBuilder.build("Direcciones encontradas", 200, direcciones));
    }
}
