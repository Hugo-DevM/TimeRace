function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export const categoryService = {
    async getAllCategories(id) {
        const res = await fetch(`http://localhost:5000/api/categories/race/${id}`, {
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error("Error al obtener las categorias");
        return await res.json();
    },
    async createCategory(data, id) {
        const res = await fetch(`http://localhost:5000/api/categories/race/${id}`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al crear la categoria");
        return await res.json();
    },
    async updateCategory(data, id) {
        const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al actualizar la categoria");
        return await res.json();
    },
    async deleteCategory(id) {
        const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error("Error al eliminar la categoria");
        return await res.json();
    },

}