import { authService } from "../models/authService";
import { useState } from "react";

export function useAuthViewModel() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    async function login() {
        setError('');
        setLoading(true);

        try {
            const data = await authService.loginUser(user);

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            return data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    async function logout() {
        try {
            await authService.logoutUser();
            localStorage.removeItem('token');
            window.location.href = "/";
        } catch (err) {
            setError("Error al cerrar sesion")
            console.error("Error al cerrar sesión:", err);
        }
    }

    return { user, error, loading, handleChange, login, logout };
}

