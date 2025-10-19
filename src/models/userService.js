function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}
export const userService = {
    async getAllUsers() {

        const res = await fetch("http://localhost:5000/api/users", {
            headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return await res.json();
    },

    async createUser(data) {
        const res = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al crear usuario");
        return await res.json();
    },

    async updateLicense(id, license) {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ license }),
        });
        if (!res.ok) throw new Error("Error al actualizar licencia");
        return await res.json();
    },

    async deleteUser(id) {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}`, }
        });
        if (!res.ok) throw new Error("Error al eliminar usuario");
        return await res.json();
    }
}