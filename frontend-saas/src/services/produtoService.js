import api from "../api";

export const listarProdutos = () => api.get("/produto/listar");

export const cadastrarProduto = (nome, user_id, clienteId) => {
    return api.post(`/produto/cliente/${user_id}/produtos`,  {
        nome,
        clienteId,
    })
}

