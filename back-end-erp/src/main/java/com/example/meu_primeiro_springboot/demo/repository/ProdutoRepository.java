package com.example.meu_primeiro_springboot.demo.repository;

import com.example.meu_primeiro_springboot.demo.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByUsuario_Id(Long usuarioId);
    Optional<Produto> findById(Long usuarioId);
    void deleteAll();
}
