"use client";
import { useState, useEffect } from "react";
import { useUserViewModel } from "../../viewmodels/userViewModel"
import styles from "../../styles/views/admin.module.css";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Dialog";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";

export default function Admin() {
    const { user, addUser, toggleStatus, removeUser } = useUserViewModel();

    const [filter, setFilter] = useState("todos");
    const [search, setSearch] = useState("");
    const [isModalShowing, setIsModalShowing] = useState(false);
    const [newUser, setNewUser] = useState({ company: "", email: "", password: "" });
    const [error, setError] = useState("");


    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token || role !== 'admin') {
            window.location.href = '/';
        }
    }, []);

    const filteredUsers = user.filter((u) => {
        const matchesFilter =
            filter === "todos" ||
            (filter === "activos" && u.license) ||
            (filter === "inactivos" && !u.license);
        const matchesSearch =
            (u.company?.toLowerCase() || "").includes(search.toLowerCase()) ||
            (u.email?.toLowerCase() || "").includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    async function handleSubmit(e) {
        e.preventDefault();
        if (!newUser.company || !newUser.email || !newUser.password) {
            setError("Por favor completa todos los campos");
            return;
        }

        try {
            await addUser({
                company: newUser.company,
                email: newUser.email,
                password: newUser.password,
            });

            setNewUser({ company: "", email: "", password: "" });
            setError("");

            setTimeout(() => setIsModalShowing(false), 0);
        } catch (err) {
            setError("No se pudo crear el usuario");
        }
    }

    return (
        <div>
            <Navbar />
            <div className={styles.userLicenseContainer}>
                <h2>Gestión de Licencias de Usuario</h2>

                <div className={styles.userLicenseToolbar}>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className={styles.userLicenseFilters}>
                        <button className={`${styles.filterButton} ${filter === "todos" ? styles.active : ""}`}
                            onClick={() => setFilter("todos")}>Todos</button>
                        <button className={`${styles.filterButton} ${filter === "activos" ? styles.active : ""}`}
                            onClick={() => setFilter("activos")}>Activos</button>
                        <button className={`${styles.filterButton} ${filter === "inactivos" ? styles.active : ""}`}
                            onClick={() => setFilter("inactivos")}>Inactivos</button>
                        <button className={styles.btnAddUser}
                            onClick={() => setIsModalShowing(true)}>+ Agregar Usuario</button>
                    </div>
                </div>

                <table className={styles.userLicenseTable}>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Licencia</th>
                            <th>Acciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((u) => (
                            <tr key={u.id}>
                                <td>{u.company}</td>
                                <td>{u.email}</td>
                                <td>{u.license ? "Activa" : "Inactiva"}</td>
                                <td>
                                    <button className={`${styles.btnAction} ${u.license ? styles.deactivate : styles.activate
                                        }`} onClick={() => toggleStatus(u.id)}>
                                        {u.license ? "Desactivar" : "Activar"}
                                    </button>

                                </td>
                                <td>
                                    <button className={styles.btnDelete} onClick={() => removeUser(u.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalShowing && (
                    <Modal isShowing={isModalShowing} onClose={() => setIsModalShowing(false)}>
                        <h1 className={styles.title}>Crear usuario</h1>
                        <p className={styles.subtitle}>Introduce los datos para crear un nuevo usuario</p>
                        <form onSubmit={handleSubmit}>
                            <p className={styles.label}>Compañia</p>
                            <FormInput
                                type="text"
                                value={newUser.company}
                                onChange={(value) => setNewUser({ ...newUser, company: value })}
                                placeholder="Compañia"
                            />
                            <p className={styles.label}>Correo electronico</p>
                            <FormInput
                                type="email"
                                value={newUser.email}
                                onChange={(value) => setNewUser({ ...newUser, email: value })}
                                placeholder="Email"
                            />
                            <p className={styles.label}>Contraseña</p>
                            <FormInput
                                type="password"
                                value={newUser.password}
                                onChange={(value) => setNewUser({ ...newUser, password: value })}
                                placeholder="Contraseña"
                            />
                            {error && <p>{error}</p>}
                            <Button type="submit">Guardar</Button>
                        </form>
                    </Modal>
                )}
            </div>
        </div>
    );
}
