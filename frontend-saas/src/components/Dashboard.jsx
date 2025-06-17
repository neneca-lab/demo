import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useClientes from "../hooks/useClientes";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
import { listarUsuarios } from "../services/clienteService"; 
import NovoClienteModal from "../components/NovoClientModal";
import EditarClienteModal from "../components/EditarClientModal";
import AdicionarProdutoModal from "../components/AdicionarProdutoModal";

function Dashboard() {
    const {
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
        recarregarClientes,
        salvarProduto,
    } = useClientes();


    const navigate = useNavigate();
    const { user } = useAuth();
    const [clienteExpandido, setClienteExpandido] = useState(null);
    const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [modalNovoAberto, setModalNovoAberto] = useState(false);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    console.log("verificar a role: ", user)

    const toggleDropdown = (id) => {
        setClienteExpandido(clienteExpandido === id ? null : id);
    };


    // abre modal para cadastrar novo usuario
    const abrirModalNovo = () => {
        setNovoEmail("");
        setNovaSenha("");
        setNovaRole("USER");
        setModalNovoAberto(true);
    };

    // abre modal para edição 
    const abrirModalEditar = (cliente) => {
        iniciarEdicao(cliente);
        setModalEditarAberto(true);
    };

    // cadastra produto setando usuario
    const abrirModalProduto = (clienteId) => {
    setClienteSelecionado(clienteId);

        listarUsuarios()
            .then(response => {
                setUsuarios(response.data);  
                setModalProdutoAberto(true);
            })
            .catch(err => {
                console.error("Erro ao buscar usuários:", err);
                alert("Erro ao buscar usuários. Verifique se você está logado e tem permissão.");
            });
    };
    

    // nem preciso falar oq isso aq faz ne?
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-800">Clientes</h2>
                    <div className="flex space-x-3">
                        <button
                            onClick={logout}
                            className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
                            title="Sair"
                        >
                            <FaPowerOff size={20} />
                        </button>
                        { user && user.role === "ADMIN" && (
                            <><button
                                onClick={abrirModalNovo}
                                className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                title="Novo Cliente"
                            >
                                <IoPersonAddSharp size={20} />
                            </button>
                            
                            <button
                                onClick={() => {
                                    if(clientes.length === 0){
                                        alert("Nenhum cliente cadastrado ainda")
                                        return;
                                    }

                                    const idPrimeiroCliente = clientes[0].id;
                                    abrirModalProduto(idPrimeiroCliente);
                                }}
                                className="flex items-center justify-center bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                                title="Adicionar Produto ao Primeiro Cliente"
                            >
                                <IoIosAddCircle size={20}/>
                            </button></>
                            
                        )}
                    
                
                    
                    </div>
                </div>

                <ul className="divide-y divide-gray-200">
                    {clientes.map((c) => (
                        <li key={c.id} className="py-3 px-4 rounded">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-900 font-medium">{c.email}</span>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleDropdown(c.id)}
                                        className="bg-gray-500 text-gray-600 px-3 py-1 rounded hover:text-white transition"
                                        aria-label="Mostrar produtos"
                                    >
                                        <FaChevronDown size={18} />
                                    </button>
                                    <button
                                        onClick={() => abrirModalEditar(c)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                        aria-label="Editar cliente"
                                    >
                                        <FiEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => excluirCliente(c.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        aria-label="Excluir cliente"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Dropdown de produtos */console.log("teste3333333",c)}
                            {clienteExpandido === c.id && (
                                <div className="mt-2 ml-4 bg-gray-100 rounded p-2">

                                    {c.produtos && c.produtos.length > 0 ? (
                                        <ul className="list-disc ml-5 text-sm text-gray-800">
                                            {c.produtos.map((produto, idx) => (
                                                <li key={idx}>{produto.nome}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">Nenhum produto.</p>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
            <NovoClienteModal
                    isOpen={modalNovoAberto}
                    onClose={() => setModalNovoAberto(false)}
                    novoEmail={novoEmail}
                    setNovoEmail={setNovoEmail}
                    novaSenha={novaSenha}
                    setNovaSenha={setNovaSenha}
                    novaRole={novaRole}
                    setNovaRole={setNovaRole}
                    criarCliente={criarCliente}
            />

            <EditarClienteModal
                isOpen={modalEditarAberto}
                onClose={() => setModalEditarAberto(false)}
                emailEdit={emailEdit}
                setEmailEdit={setEmailEdit}
                senhaEdit={senhaEdit}
                setSenhaEdit={setSenhaEdit}
                salvarEdicao={salvarEdicao}
            />

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

export default Dashboard;
