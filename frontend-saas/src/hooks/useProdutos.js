// hooks/useProdutos.js
import React, { useEffect, useState } from "react";
import { listarProdutos, 
        cadastrarProduto, 
        deletarProduto,
        atualizarProduto,
    } from "../services/produtoService";

export default function useProdutos(user_id) {
    const [produtos, setProdutos] = useState([]);
    const [ nomeProduto, setNovoProduto ] = useState("");
    const [produtoEmEdicao, setProdutoEmEdicao] = useState(null); // ← deve armazenar o objeto ou ID

    const [produtoEdit, setProdutoEdit] = useState(""); // ← somente o nome editado

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

    const iniciarEdicao = (produto) => {
        // console.log("iniciar edição: ", produto)
        setProdutoEmEdicao(produto);       // armazena objeto inteiro
        setProdutoEdit(produto.nome);      // inicia com o nome atual
    };


    const salvarProduto = ({ nome,  user_id, clienteId}) => {
        console.log("user aq: ", user_id);
        console.log("parametro produto: ", nome);

        if (!user_id) {
            alert("Usuário ou cliente não selecionado.");
            return;
        }

        cadastrarProduto(nome, user_id, clienteId)
            .then(async response => {
                console.log("response do hook: ", response)
                setNovoProduto(response.data);
                console.log("Produto salvo com sucesso:", response.data);
                alert("Produto cadastrado com sucesso!");
                await recarregarProdutos();
                // set((prev) => [...prev, response.data]);
            })
            .catch(err => {
                console.error("Erro ao salvar produto:", err);
                alert("Erro ao salvar produto.");
            });
    };

    const excluirProduto = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;
        try {
            await deletarProduto(id);
            setProdutos((prev) => prev.filter((c) => c.id !== id));
            alert("produto excluido");
        } catch (error) {
            console.log("erro: " ,error);
            alert("erro ao apagar produto");
        }
    }

    const recarregarProdutos = async () => {
        try {
            const res = await listarProdutos();
            console.log("res: ", res.data)
            setProdutos(res.data.produtos)
        } catch (error) {
            console.log("erro ao recarregar produtos: ", error)
        }
    }

    const salvarEdicaoProduto = async () => {
        if (!produtoEmEdicao) return;

        const produtoId = produtoEmEdicao.id;

        try {
            await atualizarProduto(produtoId, {
                nome: produtoEdit,
            });

            setProdutos((prev) =>
                prev.map((c) =>
                    c.id === produtoEmEdicao.id ? { ...c, nome: produtoEdit } : c
                )
            );
            
            setProdutoEmEdicao(null);
            setProdutoEdit("");
            alert("Produto atualizado com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar produto.");
            console.error("Erro ao atualizar o produto: ", error);
        }
    };




    return { produtos, 
            salvarProduto, 
            nomeProduto, 
            setProdutos, 
            excluirProduto,
            produtoEmEdicao,
            setProdutoEdit,
            iniciarEdicao,
            salvarEdicaoProduto,
        };
}
