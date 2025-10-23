function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export const runnerService = {
    async getAllRunners(id) {
        const res = await fetch(`http://localhost:5000/api/runners/race/${id}`, {
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error("Error al obtener los corredores");
        return await res.json();
    },
    async createRunner(data, id) {
        const res = await fetch(`http://localhost:5000/api/runners/race/${id}`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al crear el corredor");
        return await res.json();
    },
    async updateRunner(data, id) {
        const res = await fetch(`http://localhost:5000/api/runners/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al actualizar el corredor");
        return await res.json();
    },
    async deleteRunner(id) {
        const res = await fetch(`http://localhost:5000/api/runners/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error("Error al eliminar el corredor");
        return await res.json();
    },

}