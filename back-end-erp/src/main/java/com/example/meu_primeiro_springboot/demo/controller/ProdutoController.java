package com.example.meu_primeiro_springboot.demo.controller;
import com.example.meu_primeiro_springboot.demo.dto.ProdutoDTO;
import com.example.meu_primeiro_springboot.demo.model.Produto;

import com.example.meu_primeiro_springboot.demo.model.Usuario;
import com.example.meu_primeiro_springboot.demo.repository.UserRepository;
import com.example.meu_primeiro_springboot.demo.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/listar")
    public ResponseEntity<?> listar() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Optional<Usuario> usuarioOpt = userRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        List<Produto> produtos = produtoService.listaProdutos(usuario.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("user_id",  usuario.getId());
        response.put("produtos", produtos);
        return ResponseEntity.ok().body(response);
    }


    @PostMapping("/cliente/{id}/produtos")
    public ResponseEntity<?> salvarProdutos(@RequestBody Produto produto, @PathVariable Long id) {
        Produto produtoInserido =  produtoService.inserirProduto(produto, id);
        ProdutoDTO dto = new ProdutoDTO(produtoInserido, id);
        return ResponseEntity.ok(Collections.singletonList(dto));
    }


}
