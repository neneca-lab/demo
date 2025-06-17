import { useState, useEffect } from "react";

export default function AdicionarProdutoModal({ isOpen, onClose, usuarios, onSalvar, clienteId }) {
    const [nomeProduto, setNomeProduto] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

    useEffect(() => {
        if (isOpen) {
            setNomeProduto("");
            if (usuarios.length > 0) {
                setUsuarioSelecionado(usuarios[0].id);
            }
        }
    }, [isOpen, usuarios]);

    const salvarProduto = () => {
        if (!nomeProduto || !usuarioSelecionado) {
            alert("Preencha todos os campos");
            return;
        }

        const novoProduto = {
            nome: nomeProduto,
            user_id: usuarioSelecionado,
            clienteId: clienteId,
        };

        onSalvar(novoProduto);
        onClose();
        setNomeProduto("");
        setUsuarioSelecionado("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h3 className="text-lg font-semibold mb-4">Adicionar Produto</h3>

                <label className="block mb-1 text-sm">Nome do produto:</label>
                <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={nomeProduto}
                    onChange={(e) => setNomeProduto(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                />

                {usuarios.length > 0 && (
                    <>
                        <label className="block mb-1 text-sm">Usuário:</label>
                        <select
                            value={usuarioSelecionado}
                            onChange={(e) => setUsuarioSelecionado(Number(e.target.value))}
                            className="border p-2 w-full mb-4 rounded"
                        >
                            {usuarios.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.email}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                    <button
                        onClick={salvarProduto}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
