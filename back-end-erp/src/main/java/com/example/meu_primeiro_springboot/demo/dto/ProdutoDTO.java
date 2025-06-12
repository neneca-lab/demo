package com.example.meu_primeiro_springboot.demo.dto;

import com.example.meu_primeiro_springboot.demo.model.Produto;
import lombok.Data;
import lombok.Getter;

@Data
public class ProdutoDTO {

    private Long id;
    @Getter
    private String nome;

    public ProdutoDTO() {}

    public ProdutoDTO(Long id ,String nome) {
        this.id = id;
        this.nome = nome;
    }


    public ProdutoDTO(Produto produtoInserido, Long id) {
        this.id = id;
        this.nome = produtoInserido.getNome();
    }
}
