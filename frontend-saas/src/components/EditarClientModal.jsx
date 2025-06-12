function EditarClienteModal({ isOpen, onClose, emailEdit, setEmailEdit, senhaEdit, setSenhaEdit, salvarEdicao }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">Editar Cliente</h3>
            <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-3 w-full rounded"
            value={emailEdit}
            onChange={(e) => setEmailEdit(e.target.value)}
            />
            <input
            type="password"
            placeholder="Nova senha"
            className="border p-2 mb-3 w-full rounded"
            value={senhaEdit}
            onChange={(e) => setSenhaEdit(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
            <button
                onClick={() => {
                salvarEdicao();
                onClose();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Salvar
            </button>
            </div>
        </div>
        </div>
    );
}
export default EditarClienteModal;
