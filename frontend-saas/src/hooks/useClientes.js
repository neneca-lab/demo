import React, { useEffect, useState } from "react";
import {
    listarClientes,
    atualizarCliente,
    deletarCliente,
    cadastrarCliente,
    salvarProdutoParaCliente,
} from "../services/clienteService";


export default function useClientes() {
    const [clientes, setClientes] = useState([]);
    const [novoEmail, setNovoEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [novaRole, setNovaRole] = useState("USER");
    const [clienteExpandido, setClienteExpandido] = useState(null);


    // Estado para edição
    const [clienteEmEdicao, setClienteEmEdicao] = useState(null);
    const [emailEdit, setEmailEdit] = useState("");
    const [senhaEdit, setSenhaEdit] = useState("");

    useEffect(() => {
        listarClientes()
        .then((res) => {
            setClientes(res.data);
        })
        .catch((err) => {
            console.error("Erro ao buscar clientes:",  err.response?.data || err.message);
            alert("Erro ao carregar clientes");
        });
    }, []);

    const criarCliente = async () => {
            console.log("Role enviada:", novaRole);

        if (!novoEmail || !novaSenha) {
            alert("Preencha email e senha");
            return;
        }   

        try {
            const res = await cadastrarCliente({ email: novoEmail, password: novaSenha, role:novaRole });
            setClientes((prev) => [...prev, res.data]);
            setNovoEmail("");
            setNovaSenha("");
            setNovaRole("");
            alert("Cliente cadastrado!");
        } catch (err) {
            alert("Erro ao cadastrar cliente");
        }
    };

    const iniciarEdicao = (cliente) => {
        setClienteEmEdicao(cliente);
        setEmailEdit(cliente.email);
        setSenhaEdit("");
    };

    const salvarEdicao = async () => {
        if (!clienteEmEdicao) return;

        try {
            await atualizarCliente(clienteEmEdicao.id, {
                email: emailEdit,
                password: senhaEdit,
            });

            setClientes((prev) =>
                prev.map((c) =>
                c.id === clienteEmEdicao.id ? { ...c, email: emailEdit } : c
                )
            );

            setClienteEmEdicao(null);
            setEmailEdit("");
            setSenhaEdit("");
            alert("Cliente atualizado com sucesso");
        } catch (err) {
            console.error("Erro ao atualizar cliente:", err);
            alert("Erro ao atualizar cliente");
        }
    };

    const excluirCliente = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;
        try {
            await deletarCliente(id);
            setClientes((prev) => prev.filter((c) => c.id !== id));
            alert("Cliente excluído");
        } catch (err) {
            alert("Erro ao excluir cliente");
        }
    };

    const recarregarClientes = async () => {
        try {
            const res = await listarClientes();
            setClientes(res.data);
        } catch (err) {
            console.error("Erro ao recarregar clientes:", err);
        }
    };

    const salvarProduto = ({ nome, user_id, clienteId }) => {
        console.log("eu n aguento: " ,{nome, user_id, clienteId});
        if (!user_id || !clienteId) {
            alert("Usuário ou cliente não selecionado.");
            return;
        }

        //api axios 
        salvarProdutoParaCliente(nome, user_id, clienteId)
            .then(async response => {
                console.log("Produto salvo com sucesso:", response.data);
                alert("Produto cadastrado com sucesso!")
                await recarregarClientes();
                setClienteExpandido(clienteId);
            })
            .catch(err => {
                console.error("Erro ao salvar produto:", err);
                alert("Erro ao salvar produto.");
            });
    };

    

    return {
        clientes,
        novoEmail,
        setNovoEmail,
        novaSenha,
        setNovaSenha,
        novaRole,
        setNovaRole,
        criarCliente,
        clienteEmEdicao,
        setClienteEmEdicao,
        emailEdit,
        setEmailEdit,
        senhaEdit,
        setSenhaEdit,
        iniciarEdicao,
        salvarEdicao,
        excluirCliente,
        salvarProduto,
    };

}
