import { useState, useEffect } from "react";

export default function AdicionarProdutoModal({ isOpen, onClose, usuarios, onSalvar, clienteId}) {
    const [nomeProduto, setNomeProduto] = useState("");
    const [clienteSelecionado, setUsuarioSelecionado] = useState("");
    const userTrue = usuarios.length > 0;

    useEffect(() => {
        if (isOpen) {
            setNomeProduto("");
            if (userTrue) {
                    setUsuarioSelecionado(usuarios[0].id);
            }
        }
    }, [isOpen, usuarios]);

    if (!isOpen) return null;

    const salvarProduto = () => {
    if (!nomeProduto || !clienteSelecionado) return;

        if (userTrue && !clienteSelecionado) {
                alert("Selecione um usuário.");
                return;
        }


        onSalvar({
            nome: nomeProduto,
            user_id: userTrue ? clienteSelecionado: undefined,
            clienteId
        });

        setNomeProduto("");
        setUsuarioSelecionado("");
        onClose();
    };

    console.log("usuarios: ", usuarios);

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h3 className="text-lg font-semibold mb-4">Adicionar Produto</h3>
                <p>Nome do produto:</p>
                <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={nomeProduto}
                    onChange={(e) => setNomeProduto(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                />

                {userTrue && (
                    <>
                        <p>Usuarios:</p>
                        <select
                            value={clienteSelecionado}
                            onChange={(e) => setUsuarioSelecionado(Number(e.target.value))}
                            className="border p-2 w-full mb-4 rounded"
                        >
                            
                                <option  value={setUsuarioSelecionado.id} >
                                    {clienteSelecionado.email}
                                </option>
                            
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
    ): null ;
}
