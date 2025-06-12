package com.example.meu_primeiro_springboot.demo.dto;

import com.example.meu_primeiro_springboot.demo.model.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private Role role;
    private List<ProdutoDTO> produtos;



    public UserDTO(Long id, String email, Role role, List<ProdutoDTO> produtos) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.produtos = produtos;
    }


    public UserDTO(Long id, String email) {
        this.id = id;
        this.email = email;
    }
}
