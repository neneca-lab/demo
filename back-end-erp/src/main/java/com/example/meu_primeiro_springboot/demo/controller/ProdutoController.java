package com.example.meu_primeiro_springboot.demo.controller;
import com.example.meu_primeiro_springboot.demo.dto.ProdutoDTO;
import com.example.meu_primeiro_springboot.demo.model.Produto;

import com.example.meu_primeiro_springboot.demo.model.Usuario;
import com.example.meu_primeiro_springboot.demo.repository.ProdutoRepository;
import com.example.meu_primeiro_springboot.demo.repository.UserRepository;
import com.example.meu_primeiro_springboot.demo.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private ProdutoRepository produtoRepository;

    // lista os produtos da tela de usuario
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


    //salva produto pela tela de usuario
    @PostMapping("/cliente/{id}/produtos")
    public ResponseEntity<?> salvarProdutos(@RequestBody Produto produto, @PathVariable Long id) {
        Produto produtoInserido =  produtoService.inserirProduto(produto, id);
        ProdutoDTO dto = new ProdutoDTO(produtoInserido, id);
        return ResponseEntity.ok(Collections.singletonList(dto));
    }

    //deleta produto da tela de usuario
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> excluirProduto(@PathVariable Long id) {
        Optional<Produto> produto = produtoRepository.findById(id);
        if (produto.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        produtoRepository.delete(produto.get());
        return ResponseEntity.ok().build();
    }

    //atualiza produto na tela do usuario
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        Optional<Produto> produtoOptional = produtoRepository.findById(id);

        if (produtoOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
        }

        Produto produtoExistente = produtoOptional.get();
        produtoExistente.setNome(produtoAtualizado.getNome());

        Produto produtoSalvo = produtoRepository.save(produtoExistente);

        return ResponseEntity.ok(produtoSalvo);
    }


}
