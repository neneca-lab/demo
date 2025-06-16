import api from "../api";

export const listarProdutos = () => api.get("/produto/listar");

export const cadastrarProduto = (nome, user_id, clienteId) => {
    return api.post(`/produto/cliente/${user_id}/produtos`,  {
        nome,
        clienteId,
    })
}

export const deletarProduto = (id) => api.delete(`/produto/delete/${id}`);

export const atualizarProduto = (id, data) => api.put(`/produto/atualizar/${id}`, data);
