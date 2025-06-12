import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setUser({
                    id: decoded.id,
                    email: decoded.sub,
                    role: decoded.role,
                    token,
                });
            } catch (error) {
                console.error("Token inválido:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    return { user, setUser };
}
