package org.example.ecommerse.services.auth;


import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.request.auth.LoginRequest;
import org.example.ecommerse.domains.dto.request.user.UserRegisterRequest;
import org.example.ecommerse.domains.dto.response.auth.AuthResponse;
import org.example.ecommerse.domains.entities.User;
import org.example.ecommerse.exceptions.EmailAlreadyExistsException;
import org.example.ecommerse.helpers.enums.Role;
import org.example.ecommerse.helpers.mappers.UserMapper;
import org.example.ecommerse.repositories.UserRepository;
import org.example.ecommerse.security.JwtService;
import org.example.ecommerse.security.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse registrar(UserRegisterRequest dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new EmailAlreadyExistsException("Ya existe una cuenta con ese email");
        }

        User user = new User();
        user.setNombre(dto.nombre());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setRol(Role.CLIENT);

        User guardado = userRepository.save(user);

        String token = jwtService.generarToken(new UserDetailsImpl(guardado));
        return new AuthResponse(token, UserMapper.toResponse(guardado));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password())
        );

        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new IllegalStateException("Error inesperado autenticando al usuario"));

        String token = jwtService.generarToken(new UserDetailsImpl(user));
        return new AuthResponse(token, UserMapper.toResponse(user));
    }
}
