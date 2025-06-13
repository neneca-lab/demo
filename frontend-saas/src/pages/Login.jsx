import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuth } from "../hooks/useAuth";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", { email, password: senha });
            const token = res.data.token;
            const role = res.data.role;

            localStorage.setItem("token", token);
            const decoded = jwt_decode(token);
            setUser({
                email: decoded.sub,
                role: decoded.role,
                token,
            });
            if (role === "ADMIN") {
                navigate("/usuarios");
            } else if (role === "USER") {
                navigate("/produtos");
            } else {
                alert("Role desconhecida");
            }
        } catch (err) {
            console.error(err);
            alert("Login inválido");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 max-w-md w-full bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                >
                    Entrar
                </button>
                <div className="mt-4 text-center space-y-2">
                    <Link to="/recuperar-senha" className="block text-sm text-blue-600 hover:underline">
                        Esqueci minha senha
                    </Link>
                </div>
            </div>
        </div>
    );
}
