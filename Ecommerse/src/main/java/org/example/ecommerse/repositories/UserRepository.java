package org.example.ecommerse.repositories;

import org.example.ecommerse.domains.entities.User;
import org.example.ecommerse.helpers.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRol(Role rol);
    boolean existsByEmail(String email);
}
