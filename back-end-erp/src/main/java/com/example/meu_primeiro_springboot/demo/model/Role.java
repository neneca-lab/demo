package com.example.meu_primeiro_springboot.demo.model;

public enum Role {
    USER("user"),
    ADMIN("admin");

    private String role;
    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
