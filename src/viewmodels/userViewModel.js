import { userService } from "@/models/userService";
import { useEffect, useState } from "react";

export function useUserViewModel() {
    const [user, setUser] = useState([])

    useEffect(() => {
        loadUsers();
    }, []);


    async function loadUsers() {
        const data = await userService.getAllUsers();
        setUser(data);
    }

    async function addUser(newUser) {
        await userService.createUser(newUser);
        await loadUsers();
    }

    async function toggleStatus(id) {
        const userToUpdate = user.find((u) => u.id === id);
        if (!userToUpdate) return;

        const updatedLicense = !userToUpdate.license;
        await userService.updateLicense(id, updatedLicense)
        await loadUsers();
    }

    async function removeUser(id) {
        await userService.deleteUser(id);
        await loadUsers();
    }

    return { user, addUser, toggleStatus, removeUser };
}