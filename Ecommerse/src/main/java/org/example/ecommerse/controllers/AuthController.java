package org.example.ecommerse.controllers;

import jakarta.validation.Valid;
import org.example.ecommerse.domains.dto.request.auth.LoginRequest;
import org.example.ecommerse.domains.dto.request.user.UserRegisterRequest;
import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.services.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<GeneralResponse> register(@Valid @RequestBody UserRegisterRequest dto) {
        var response = authService.registrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.build("Usuario registrado exitosamente", 201, response));
    }

    @PostMapping("/login")
    public ResponseEntity<GeneralResponse> login(@Valid @RequestBody LoginRequest dto) {
        var response = authService.login(dto);
        return ResponseEntity.ok(ResponseBuilder.build("Login exitoso", 200, response));
    }
}
