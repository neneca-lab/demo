package com.example.meu_primeiro_springboot.demo.service;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void enviarEmailRecuperacaoSenha(String email, String token, Date expiration) {

        Long data = expiration.getTime();

        Long dataAtual = System.currentTimeMillis();

        if (dataAtual <= data){
            String urlReset = "http://localhost:3000/reset?token=" + token;
            SimpleMailMessage mensagem = new SimpleMailMessage();
            mensagem.setTo(email);
            mensagem.setSubject("Redefinição de senha");
            mensagem.setFrom("huansonecacntt@gmail.com");
            mensagem.setText("Olá!\n\nPara redefinir sua senha, acesse o link abaixo:\n" + urlReset + "\n\nSe você não solicitou, ignore esta mensagem.");
            mailSender.send(mensagem);
        }
    }
}
