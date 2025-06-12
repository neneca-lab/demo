package com.example.meu_primeiro_springboot.demo.dto;


import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class ClientDTO {
    private Long id;
    private String email;
    @Getter
    private List<ProdutoDTO> produtos;

    public ClientDTO() {}

    public ClientDTO(Long id, String email, List<ProdutoDTO> produtos) {
        this.id = id;
        this.email = email;
        this.produtos = produtos;
    }

}
