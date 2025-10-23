import { useEffect, useState } from "react";
import { categoryService } from "../models/categoryService";

export function useCategoryViewModel(id) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (!id) return;
        loadCategories();
    }, [id]);

    async function loadCategories() {
        const data = await categoryService.getAllCategories(id);
        setCategory(data)
    }
    async function addCategory(data) {
        await categoryService.createCategory(data, id);
        await loadCategories();
    }

    async function alterCategory(data) {
        await categoryService.updateCategory(data, id);
        await loadCategories();
    }

    async function deleteCategory() {
        await categoryService.deleteCategory(id)
        await loadCategories();
    }

    return { category, addCategory, alterCategory, deleteCategory }
}