function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export const leagueService = {
    async getAllLeagues() {
        const res = await fetch("http://localhost:5000/api/leagues", {
            headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error("Error al obtener las ligas");
        return await res.json();
    },

    async createLeague(data) {
        const res = await fetch("http://localhost:5000/api/leagues", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al crear la league");
        return await res.json();
    },
}