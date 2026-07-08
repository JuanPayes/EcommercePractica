package org.example.ecommerse.controllers;


import org.example.ecommerse.domains.dto.response.GeneralResponse;
import org.example.ecommerse.helpers.ResponseBuilder;
import org.example.ecommerse.helpers.enums.Role;
import org.example.ecommerse.security.UserDetailsImpl;
import org.example.ecommerse.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/perfil")
    public ResponseEntity<GeneralResponse> miPerfil(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        var usuario = userService.buscarPorId(userDetails.getId());
        return ResponseEntity.ok(ResponseBuilder.build("Perfil obtenido", 200, usuario));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<GeneralResponse> listarTodos() {
        var usuarios = userService.listarTodos();
        return ResponseEntity.ok(ResponseBuilder.build("Usuarios encontrados", 200, usuarios));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/rol/{rol}")
    public ResponseEntity<GeneralResponse> buscarPorRol(@PathVariable Role rol) {
        var usuarios = userService.buscarPorRol(rol);
        return ResponseEntity.ok(ResponseBuilder.build("Usuarios encontrados", 200, usuarios));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/rol")
    public ResponseEntity<GeneralResponse> cambiarRol(@PathVariable Long id, @RequestParam Role nuevoRol) {
        var usuario = userService.cambiarRol(id, nuevoRol);
        return ResponseEntity.ok(ResponseBuilder.build("Rol actualizado", 200, usuario));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<GeneralResponse> eliminar(@PathVariable Long id) {
        userService.eliminar(id);
        return ResponseEntity.ok(ResponseBuilder.build("Usuario eliminado", 200, null));
    }
}
