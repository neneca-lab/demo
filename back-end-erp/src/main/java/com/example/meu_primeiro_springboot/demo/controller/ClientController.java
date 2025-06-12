package com.example.meu_primeiro_springboot.demo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meu_primeiro_springboot.demo.dto.ProdutoDTO;
import com.example.meu_primeiro_springboot.demo.dto.UserDTO;
import com.example.meu_primeiro_springboot.demo.model.Usuario;
import com.example.meu_primeiro_springboot.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/cliente")
public class ClientController {

    @Autowired
    private final UserRepository userRepository;

    public ClientController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<List<UserDTO>> listarClientes(@PathVariable Long id) {
        List<Usuario> usuarios = userRepository.findAll();

        List<UserDTO> response = usuarios.stream()
                .map(u -> {
                    List<ProdutoDTO> produtoDTO = u.getProdutos().stream().map(
                            p -> new ProdutoDTO(p.getId(), p.getNome())).collect(Collectors.toList());
                    return new UserDTO(u.getId() ,u.getEmail(), u.getRole(), produtoDTO);
                }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }



}
