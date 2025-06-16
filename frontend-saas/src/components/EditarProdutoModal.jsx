export default function EditarProdutoModal({isOpen, onClose, produtoEmEdicao, setProdutoEdit, salvarEdicaoProduto}){
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-96">
                <h3 className="text-lg font-bold mb-4">Editar Produto</h3>
                <input
                    type="text"
                    className="border p-2 mb-3 w-full rounded"
                    onChange={(e) => setProdutoEdit(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                    <button
                        onClick={() => {
                            salvarEdicaoProduto();
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