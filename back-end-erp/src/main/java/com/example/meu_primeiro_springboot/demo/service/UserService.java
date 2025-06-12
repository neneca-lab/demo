package com.example.meu_primeiro_springboot.demo.service;

import com.example.meu_primeiro_springboot.demo.model.Role;
import com.example.meu_primeiro_springboot.demo.model.Usuario;
import com.example.meu_primeiro_springboot.demo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Usuario registerUser(String email, String password,  Role role) {
        String passwordEncrypted = passwordEncoder.encode(password);
        Usuario usuario = new Usuario(email, passwordEncrypted, role);
        return userRepository.save(usuario);
    }

    public Optional<Usuario> findByUsername(String email) {
        return userRepository.findByEmail(email);
    }
}
