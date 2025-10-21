function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export const raceService = {
    async getLeagueById(id) {
        const res = await fetch(`http://localhost:5000/api/races/${id}`, {
            headers: getAuthHeaders(),
        });

        if (!res.ok) throw new Error("Error al obtener la liga");
        return await res.json();
    },

    async createRace(data, id) {
        const res = await fetch(`http://localhost:5000/api/races/${id}`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al crear la carrera");
        return await res.json();
    }
};
