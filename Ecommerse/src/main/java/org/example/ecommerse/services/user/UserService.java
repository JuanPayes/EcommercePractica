package org.example.ecommerse.services.user;

import lombok.RequiredArgsConstructor;
import org.example.ecommerse.domains.dto.response.user.UserResponse;
import org.example.ecommerse.domains.entities.User;
import org.example.ecommerse.exceptions.ResourceNotFoundException;
import org.example.ecommerse.helpers.enums.Role;
import org.example.ecommerse.helpers.mappers.UserMapper;
import org.example.ecommerse.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UserResponse> listarTodos() {
        return userRepository.findAll().stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserResponse buscarPorId(Long id) {
        User user = buscarEntidadPorId(id);
        return UserMapper.toResponse(user);
    }

    @Transactional(readOnly = true)
    public List<UserResponse> buscarPorRol(Role rol) {
        return userRepository.findByRol(rol).stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Transactional
    public UserResponse cambiarRol(Long id, Role nuevoRol) {
        User user = buscarEntidadPorId(id);
        user.setRol(nuevoRol);
        return UserMapper.toResponse(userRepository.save(user));
    }

    @Transactional
    public void eliminar(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado con id: " + id);
        }
        userRepository.deleteById(id);
    }

    private User buscarEntidadPorId(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
    }
}
