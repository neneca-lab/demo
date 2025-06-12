// hooks/useProdutos.js
import React, { useEffect, useState } from "react";
import { listarProdutos, cadastrarProduto } from "../services/produtoService";

export default function useProdutos(user_id) {
    const [produtos, setProdutos] = useState([]);
    const [ novoProduto, setNovoProduto ] = useState("");
    const [clientes, setClientes] = useState([]);



    useEffect(() => {
        
        listarProdutos()
            .then((res) => {
                const lista = res.data.produtos;
                if (Array.isArray(lista)) {
                    setProdutos(lista);
                } else {
                    console.warn("res.data.produto não é array:", lista);
                    setProdutos([]);
                }
            })
            .catch((err) => {
                console.error("Erro ao buscar produtos: ", err.response?.data || err.message);
            });
    }, [user_id]);

    const salvarProdutoUsuario = ({ nome, user_id, clienteId }) => {
    
        console.log("user aq: ", user_id);
        console.log("parametro nome: ", nome);

        if (!user_id) {
            alert("Usuário ou cliente não selecionado.");
            return;
        }

        cadastrarProduto(nome, user_id, clienteId)
            .then(async response => {
                console.log("Produto salvo com sucesso:", response.data);
                alert("Produto cadastrado com sucesso!");
                setProdutos((prev) => [...prev, response.data]);
            })
            .catch(err => {
                console.error("Erro ao salvar produto:", err);
                alert("Erro ao salvar produto.");
            });
    };



    return { produtos, salvarProdutoUsuario };
}
