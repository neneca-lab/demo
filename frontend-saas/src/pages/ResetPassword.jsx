import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../api";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [novaSenha, setNovaSenha] = useState("");
    const navigate = useNavigate();

    const handleReset = async () => {
        try {
            const res = await api.post("/auth/resetar-senha", {
                token,
                newPassword: novaSenha
            })
            alert("Senha redefinida com sucesso");
            navigate("/auth/login");
        } catch (err) {
            alert("Token inválido ou erro ao redefinir a senha");
            navigate("/auth/login");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">Redefinir Senha</h2>
                <input
                    type="password"
                    placeholder="Nova senha"
                    className="border p-2 w-full mb-4"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />
                <button
                    onClick={handleReset}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Redefinir
                </button>
            </div>
            
            
        </div>
        
    );
}
