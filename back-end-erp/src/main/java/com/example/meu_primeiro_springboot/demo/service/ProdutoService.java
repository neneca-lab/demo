package com.example.meu_primeiro_springboot.demo.service;

import java.util.ArrayList;
import java.util.List;

import com.example.meu_primeiro_springboot.demo.dto.ProdutoDTO;
import com.example.meu_primeiro_springboot.demo.dto.UserDTO;
import com.example.meu_primeiro_springboot.demo.model.Produto;
import com.example.meu_primeiro_springboot.demo.model.Usuario;
import com.example.meu_primeiro_springboot.demo.repository.ProdutoRepository;
import com.example.meu_primeiro_springboot.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Produto> listaProdutos(Long usuarioId) {
        return produtoRepository.findByUsuario_Id(usuarioId);
    }

    public Usuario saveUser(UserDTO dto){
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.getEmail());

        usuario =userRepository.save(usuario);


        List<Produto> produtos = new ArrayList<>();
        for (ProdutoDTO produtoDTO : dto.getProdutos()) {
            Produto produto = new Produto();
            produto.setNome(produtoDTO.getNome());
            produto.setUsuario(usuario); // Associa a marca ao produto
            produtos.add(produto);
        }

        produtoRepository.saveAll(produtos);
        usuario.setProdutos(produtos);
        return usuario;
    }

    public Produto buscaProdutoPorId(Long id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public Produto inserirProduto(Produto produto, Long id) {
        Usuario usuario = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + id));

        produto.setUsuario(usuario);// associando o cliente ao produto
        return produtoRepository.save(produto);
    }

    public List<Produto> editarProduto(Long id, Produto produtoAlterado){
        Produto produtoAtual = (Produto) buscaProdutoPorId(id);
        produtoAtual.setNome(produtoAlterado.getNome());

        return (List<Produto>) produtoRepository.save(produtoAtual);
    }

    public Boolean deletarProduto(Long id) {
        Produto produto = (Produto) buscaProdutoPorId(id);
        if (produto == null) {
            return false;
        }else {
            produtoRepository.delete(produto);
        }
        return true;
    }

}