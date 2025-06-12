package com.example.meu_primeiro_springboot.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "users")
@Data
public class Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Produto> produtos;

    @Column(nullable = false)
    private String password;

    private String resetToken;

    private Date dateExpirationToken;

    @Enumerated(EnumType.STRING)
    private Role role;


    public Usuario() {}
    public Usuario(String email, String senha, Role role) {
        this.email = email;
        this.password = senha;
        this.role = role;
    }

    public List<Produto> getProdutos() {
        if (produtos == null) {
            produtos = new ArrayList<>();
        }
        return produtos;
    }

}
