import React from "react";
import { useState } from "react";
import useProdutos from "../hooks/useProdutos";
import { useAuth } from "../hooks/useAuth";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Footer from "../components/Footer";
import { IoIosAddCircle } from "react-icons/io";
import { listarUsuarios } from "../services/clienteService";
import AdicionarProdutoModal from "../components/AdicionarProdutoModal";
import EditarProdutoModal from "../components/EditarProdutoModal";




export default function UserPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [clienteSelecionado, 
            setClienteSelecionado
        ] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
    const { 
            produtos, 
            salvarProduto,
            nomeProduto,
            setProdutos,
            excluirProduto,
            iniciarEdicao,
            produtoEmEdicao,
            setProdutoEdit,
            salvarEdicaoProduto,
        } = useProdutos(user?.id);
    



    const abrirModalProduto = () => {
        setClienteSelecionado(user?.id);
        listarUsuarios()
                    .then(response => {
                        setUsuarios(response.data);  
                        setModalProdutoAberto(true);
                    })
                    .catch(err => {
                        console.error("Erro ao buscar usuários:", err);
                        alert("Erro ao buscar usuários. Verifique se você está logado e tem permissão.");
                    });


    }

    const abrirModalEditarProduto = (id) => {
        const produto = produtos.find((p) => p.id === id);
        if (produto) {
            iniciarEdicao(produto); // ← agora sim o hook vai ter acesso ao nome e id
            setModalEditarAberto(true);
        }
    }
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500">Carregando informações do usuário...</p>
            </div>
        );
    }

    console.log("produtos user page: ", produtos);

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Meus Produtos</h2>
                    <div className="flex space-x-3">
                        <button
                            onClick={logout}
                            className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
                            title="Sair"
                        >
                            <FaPowerOff size={20} />
                        </button>
                        <button
                            onClick={abrirModalProduto}
                            className="flex itemns-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            <IoIosAddCircle size={20} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    {produtos <= 0 ? (
                        <div className="text-center py-4">
                        <p className="text-gray-500 italic text-sm">Nenhum produto encontrado.</p>
                        </div>
                    ) : (
                        <ul className="list-disc ml-6 space-y-2 text-gray-800">
                        {(Array.isArray(produtos) ? produtos : []).map((produto) => (
                            <li
                            key={produto.id}
                            className="bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 transition-colors flex justify-between items-center"
                            >
                            <span>{produto.nome}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => abrirModalEditarProduto(produto.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                                    aria-label="Atualizar produto"
                                >
                                <FiEdit size={18} />
                                </button>
                                <button
                                    onClick={() => excluirProduto(produto.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                                    aria-label="Excluir produto"
                                >
                                <FiTrash2 size={18} />
                                </button>
                            </div>
                            </li>
                        ))}
                        </ul>
                    )}
                </div>


            </div>
            <Footer />
            <AdicionarProdutoModal
                isOpen={modalProdutoAberto}
                onClose={() => setModalProdutoAberto(false)}
                usuarios={usuarios}
                onSalvar={salvarProduto}
                clienteId={clienteSelecionado}
            />

            <EditarProdutoModal
                isOpen={modalEditarAberto}
                onClose={() => setModalEditarAberto(false)}
                produtoEmEdicao={produtoEmEdicao}
                setProdutoEdit={setProdutoEdit}
                salvarEdicaoProduto={salvarEdicaoProduto}
            />
        </div>
    );
}
