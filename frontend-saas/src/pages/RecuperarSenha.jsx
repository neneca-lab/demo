import { useState } from "react";
import api from "../api";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


export default function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/recuperar-senha", { email });
            if (res.data) {
                setEnviado(true);
                alert("Email enviado!")
                setLoading(false);
                navigate("/auth/login");
            } else {
                alert("Erro inesperado. Tente novamente mais tarde.");
                setLoading(false);
            }
        } catch (err) {
            console.error("Erro ao enviar e-mail:", err);
            alert("Erro ao enviar e-mail.");
            setEnviado(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Recuperar Senha</h2>

                {loading ? (
                    <div className="flex flex-col items-center justify-center">
                        <svg
                            className="animate-spin h-8 w-8 text-blue-500 mb-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        <span className="text-blue-600 font-medium">Enviando e-mail...</span>
                    </div>
                ) : enviado ? (
                    <div className="text-center">
                        <p className="text-green-600">
                            Se este e-mail estiver cadastrado, enviaremos as instruções para redefinir sua senha.
                        </p>

                        {resetLink && (
                            <div className="mt-4 text-sm text-gray-600">
                                <p><strong>Link de teste (dev):</strong></p>
                                <a
                                    href={resetLink}
                                    className="text-blue-500 underline break-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {resetLink}
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border p-2 w-full rounded mb-4"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                        >
                            Enviar instruções
                        </button>
                    </form>
                )}
                <Footer />
            </div>
        </div>
    );
}
