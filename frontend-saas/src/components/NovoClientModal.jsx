export default function NovoClienteModal({ isOpen, onClose, novoEmail, setNovoEmail, novaSenha, setNovaSenha, novaRole, setNovaRole, criarCliente }) {
    console.log("teste; ", novaRole);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">Novo Cliente</h3>
            <input
                type="email"
                placeholder="Email"
                className="border p-2 mb-3 w-full rounded"
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                className="border p-2 mb-3 w-full rounded"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
            />
            <select
                className="border p-2 mb-3 w-full rounded"
                value={novaRole}
                onChange={(e) => setNovaRole(e.target.value)}
            >
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
            </select>
            <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
            <button
                onClick={() => {
                criarCliente();
                onClose();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Criar
            </button>
            </div>
        </div>
        </div>
    );
}

