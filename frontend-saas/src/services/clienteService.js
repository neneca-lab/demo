import api from "../api";

export const listarClientes = () => api.get("/auth/clientes");

export const atualizarCliente = (id, data) => api.put(`/auth/clientes/${id}`, data);

export const deletarCliente = (id) => api.delete(`/auth/clientes/${id}`);

export const cadastrarCliente = (data) => api.post("/auth/register", data);

export const listarUsuarios = () => api.get("/auth/list-users");

export const salvarProdutoParaCliente = (nome, user_id, clienteId) => {
    return api.post(`/produto/cliente/${user_id}/produtos`, {
        nome,
        clienteId,
})}
