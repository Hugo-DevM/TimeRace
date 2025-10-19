export const authService = {
    async loginUser(user) {
        const res = await fetch('http://localhost:5000/api/sessions/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error("Error al iniciar sesion");
        return await res.json();
    },

    async logoutUser() {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch('http://localhost:5000/api/sessions/logout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Error al cerrar sesion");
        return;
    }
}