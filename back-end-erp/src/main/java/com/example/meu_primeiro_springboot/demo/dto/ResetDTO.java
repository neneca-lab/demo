package com.example.meu_primeiro_springboot.demo.dto;

import lombok.Data;

@Data
public class ResetDTO {
    private String token;
    private String newPassword;

    public ResetDTO(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }
}
