package com.example.meu_primeiro_springboot.demo.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meu_primeiro_springboot.demo.dto.ClientDTO;
import com.example.meu_primeiro_springboot.demo.dto.LoginRequest;
import com.example.meu_primeiro_springboot.demo.dto.ProdutoDTO;
import com.example.meu_primeiro_springboot.demo.dto.ResetDTO;
import com.example.meu_primeiro_springboot.demo.dto.UserDTO;
import com.example.meu_primeiro_springboot.demo.model.Role;
import com.example.meu_primeiro_springboot.demo.model.Usuario;
import com.example.meu_primeiro_springboot.demo.repository.UserRepository;
import com.example.meu_primeiro_springboot.demo.security.JWTUtil;
import com.example.meu_primeiro_springboot.demo.service.EmailService;
import com.example.meu_primeiro_springboot.demo.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;
    private final EmailService emailService;



    public AuthController(UserService userService, JWTUtil jwtUtil, EmailService emailService) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // register somente admin
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody  Map<String, String> request) {
        if (this.userRepository.findByEmail(request.get("email")).isPresent()) {
            return ResponseEntity.badRequest().body("email already exists");
        }
        Usuario usuario = userService.registerUser(request.get("email"), request.get("password"), Role.valueOf(request.get("role")));
        return ResponseEntity.ok(usuario);
    }

    // login do usuario ou admin
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated LoginRequest request) {
        Optional<Usuario> userOpt = userService.findByUsername(request.getEmail());

        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user);

                String role = String.valueOf(user.getRole());
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("role", role);
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }

    // listar clientes pela tela de adin
    @GetMapping("/clientes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClientDTO>> listarClientes() {
        List<Usuario> usuarios = userRepository.findAll();

        List<ClientDTO> response = usuarios.stream()
                .map(u -> {
                    List<ProdutoDTO> produtoDTO = u.getProdutos().stream()
                            .map(p -> new ProdutoDTO(p.getId(), p.getNome())).collect(Collectors.toList());
                    return new ClientDTO(u.getId(),u.getEmail(), produtoDTO);
                }).collect(Collectors.toList());


        return ResponseEntity.ok(response);
    }

    // lista os usuarios para o select no front
    @GetMapping("/list-users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> listarUsuarios() {
        List<Usuario> usuarios = userRepository.findAll();
        List<UserDTO> response = new ArrayList<>();

        for (Usuario u : usuarios) {
            UserDTO dto = new UserDTO(u.getId(), u.getEmail());
            response.add(dto);
        }

        return ResponseEntity.ok(response);
    }


    // atualiza cliente pela tela de admin
    @PutMapping("/clientes/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Usuario> optionalUsuario = userRepository.findById(id);

        if (optionalUsuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        Usuario usuario = optionalUsuario.get();
        usuario.setEmail(request.get("email"));
        usuario.setPassword(passwordEncoder.encode(request.get("password")));
        userRepository.save(usuario);

        return ResponseEntity.ok(Map.of("id", usuario.getId(), "email", usuario.getEmail()));
    }

    // admin deleta cliente e produto
    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Usuario> optionalUsuario = userRepository.findById(id);
        if (optionalUsuario.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        userRepository.delete(optionalUsuario.get());
        return ResponseEntity.ok(Map.of("message", "Usuário e seus produtos foram deletados"));
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> forgotPassword(@RequestBody @Validated Map<String, String> body) {
        String email = body.get("email");
        Optional<Usuario> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não encontrado");
        }

        Usuario user = optionalUser.get();
        String token = UUID.randomUUID().toString();
        user.setDateExpirationToken(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000));
        Date expiration = user.getDateExpirationToken();
        user.setResetToken(token);
        userRepository.save(user);

        emailService.enviarEmailRecuperacaoSenha(email, token, expiration);

        return ResponseEntity.ok("Email de recuperação enviado");
    }

    @PostMapping("/resetar-senha")
    public ResponseEntity<?> resetPassword(@RequestBody ResetDTO dto) {
        Optional<Object> optionalUser = userRepository.findByResetToken(dto.getToken());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido");
        }

        Usuario user = (Usuario) optionalUser.get();

        if (user.getDateExpirationToken().before(new Date())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expirado");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        user.setResetToken(null);
        userRepository.save(user);

        return ResponseEntity.ok("Senha redefinida com sucesso");
    }

}
