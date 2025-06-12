import React from "react";
import { useState } from "react";
import useProdutos from "../hooks/useProdutos";
import { useAuth } from "../hooks/useAuth";
import {cadastrarProduto} from "../services/produtoService";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { IoIosAddCircle } from "react-icons/io";
import AdicionarProdutoModal from "../components/AdicionarProdutoModal";
import useClientes from "../hooks/useClientes";




export default function UserPage() {
    const { clientes, setNovaRole, salvarProduto } = useClientes();
    const { user } = useAuth();
    const [userteste, setUser] = useState(null);
    const navigate = useNavigate();
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
    const { produtos } = useProdutos(user?.id);



    const novoProdutoUsuario = () => {
        setModalProdutoAberto(true);
        setNovaRole("USER");
    }

    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login");
    };
    // console.log("produtos: ", produtos);

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500">Carregando informações do usuário...</p>
            </div>
        );
    }

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
                            onClick={novoProdutoUsuario}
                            className="flex itemns-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            <IoIosAddCircle size={20} />
                        </button>
                    </div>
                </div>

                {produtos.length === 0 ? (
                    <div className="text-center py-4">
                        <p className="text-gray-500 italic text-sm">Nenhum produto encontrado.</p>
                    </div>
                ) : (
                    <ul className="list-disc ml-6 space-y-2 text-gray-800">
                        {produtos.map((produto) => (
                        <li
                            key={produto.id}
                            className="bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 transition-colors"
                        >
                            {produto.nome}
                        </li>
                        ))}
                    </ul>
                )}

            </div>
            <Footer />
            <AdicionarProdutoModal
                isOpen={modalProdutoAberto}
                onClose={() => setModalProdutoAberto(false)}
                usuarios={usuarios}
                onSalvar={salvarProduto}
                clienteId={clienteSelecionado}
            />
        </div>
    );
}
