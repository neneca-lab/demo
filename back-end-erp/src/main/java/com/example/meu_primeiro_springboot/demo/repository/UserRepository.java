package com.example.meu_primeiro_springboot.demo.repository;

import com.example.meu_primeiro_springboot.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findById(Long id);

    Optional<Object> findByResetToken(String token);
}
