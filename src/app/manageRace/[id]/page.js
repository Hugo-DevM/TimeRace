"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRaceViewModel } from "../../../viewmodels/raceViewModel";
import { useCategoryViewModel } from "../../../viewmodels/categoryViewModel";
import { useRunnerViewModel } from "../../../viewmodels/runnerViewModel";
import styles from "../../../styles/views/managerace.module.css";

import Modal from "../../../components/Dialog";
import Button from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import Select from "../../../components/Select";

import { IconCategory, IconDelete, IconEdit, IconPlus, IconRunner, IconBack } from "../../../styles/Icons/Icons";

export default function ManageRace() {

    const { id } = useParams();
    const { race } = useRaceViewModel(id, "race");
    const { category, addCategory, alterCategory, deleteCategory } = useCategoryViewModel(id);
    const { runner, addRunner, alterRunner, deleteRunner } = useRunnerViewModel(id);
    const [error, setError] = useState("");
    const [isModalShowingC, setIsModalShowingC] = useState(false);
    const [isModalShowingR, setIsModalShowingR] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", laps: "" });
    const [newRunner, setNewRunner] = useState({ name: "", num_dorsal: "", team_name: "", subscribe: "", category_id: "" });

    const isViewMode = true;
    const [subscribe] = useState([
        { label: "Sí", value: true },
        { label: "No", value: false },
    ]);

    const router = useRouter();

    console.log("Datos enviados al backend:", newRunner);
    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token || role !== 'user') {
            window.location.href = '/';
        }
    }, []);

    async function handleSubmitCategory(e) {
        e.preventDefault();
        if (!newCategory.name || !newCategory.laps) {
            setError("Por favor completa todos los campos");
            return;
        }

        try {
            await addCategory({
                name: newCategory.name,
                laps: newCategory.laps,
            });

            setNewCategory({ name: "", laps: "" });
            setError("");

            setTimeout(() => setIsModalShowingC(false), 0);
        } catch (err) {
            setError("No se pudo crear la categoria");
        }


    }

    async function handleSubmitRunner(e) {
        e.preventDefault();
        if (!newRunner.name || !newRunner.num_dorsal || !newRunner.category_id || !newRunner.subscribe) {
            setError("Por favor completa todos los campos");
            return;
        }

        try {
            await addRunner({
                name: newRunner.name,
                num_dorsal: newRunner.num_dorsal,
                team_name: newRunner.team_name,
                subscribe: newRunner.subscribe,
                category_id: newRunner.category_id
            });

            setNewRunner({ name: "", num_dorsal: "", team_name: "", subscribe: "", category_id: "", subscribe: "" });
            setError("");

            setTimeout(() => setIsModalShowingR(false), 0);
        } catch (err) {
            setError("No se pudo crear el corredor");
        }

    }

    return (
        <div>
            <header className={styles.contentHeader}>
                <div className={styles.contentTitle}>
                    <div className={styles.contentItems}>
                        <button
                            className={styles.btnReturn}
                            onClick={() => router.back()}
                        >
                            <IconBack />
                        </button>
                        <h1 className={styles.title}>
                            {race?.name}
                        </h1>
                    </div>
                    <a className={styles.btnDeleteRace} href="/race">Eliminar</a>
                </div>
                <p className={styles.subtitleHeader}>Pogramada</p>
            </header>

            <main className={styles.contentMain}>
                {/* Categorías */}
                <section className={styles.contentData}>
                    <div className={styles.sectionData}>
                        <div className={styles.contentTitle}>
                            <h2 className={styles.title}>Categorías de la Carrera</h2>
                            <button className={styles.btnAdd} onClick={() => setIsModalShowingC(true)}>
                                <IconPlus />
                                Agregar Categoría
                            </button>
                        </div>
                        {/* Tabla de datos de categoria */}
                        <div className={styles.contentDataList}>
                            {category.length > 0 ? category.map((c) => (
                                <div key={c.id} className={styles.cardData}>
                                    <div className={styles.content}>
                                        <IconCategory />
                                        <h3 className={styles.title}>{c.name}</h3>
                                        <p className={styles.subtitle}>{`${c.laps} vueltas`}</p>
                                    </div>
                                    <div className={styles.contentActions}>
                                        <a className={styles.btnActions} href="">
                                            <IconEdit />
                                        </a>
                                        <a href="">
                                            <IconDelete />
                                        </a>
                                    </div>
                                </div>
                            )) : <p>Agrega una categoria</p>}
                        </div>
                    </div>

                    {/* Modal Categoría */}
                    {isModalShowingC && (
                        <Modal isShowing={isModalShowingC} onClose={() => setIsModalShowingC(false)}>
                            <h1 className={styles.title}>Crear Nueva Categoria</h1>
                            <p className={styles.subtitle}>Introduce los datos para crear una nueva carrera</p>
                            <form onSubmit={handleSubmitCategory}>
                                <p className={styles.label}>Nombre de la categoria</p>
                                <FormInput
                                    type="text"
                                    value={newCategory.name}
                                    onChange={(value) => setNewCategory({ ...newCategory, name: value })}
                                    placeholder="Introduce el nombre de la categoria"
                                    readOnly={!isViewMode}
                                />
                                <p className={styles.label}>Numero de vueltas</p>
                                <FormInput
                                    type="number"
                                    value={newCategory.laps}
                                    onChange={(value) => setNewCategory({ ...newCategory, laps: value })}
                                    placeholder="Ingresa el numero de vueltas de la categoria"
                                    readOnly={!isViewMode}
                                />
                                {error && <p>{error}</p>}
                                <Button type="submit">Guardar</Button>
                            </form>
                        </Modal>
                    )}
                </section>

                {/* Corredores */}
                <section className={styles.contentData}>
                    <div className={styles.sectionData}>
                        <div className={styles.contentTitle}>
                            <h2 className={styles.title}>Corredores Inscritos</h2>
                            <button className={styles.btnAdd} onClick={() => setIsModalShowingR(true)}>
                                <IconPlus />
                                Agregar Corredor
                            </button>
                        </div>
                        {/* <!-- Tabla de datos de categoria --> */}
                        <div className={styles.contentDataList}>
                            {runner.length > 0 ? runner.map((r) => (
                                <div key={r.id} className={styles.cardData}>
                                    <div className={styles.content}>
                                        <IconRunner />
                                        <h3 className={styles.title}>
                                            {`#${r.num_dorsal} - ${r.name}`}
                                        </h3>
                                        <p className={styles.subtitle}>{r.category_id}</p>
                                    </div>
                                    <div className={styles.contentActions}>
                                        <a className={styles.btnActions} href="">
                                            <IconEdit />
                                        </a>
                                        <a href="">
                                            <IconDelete />
                                        </a>
                                    </div>
                                </div>
                            )) : <p>Agrega corredores</p>}
                        </div>
                    </div>

                    {/* Modal Corredor */}
                    {isModalShowingR && (
                        <Modal isShowing={isModalShowingR} onClose={() => setIsModalShowingR(false)}>
                            <h1 className={styles.title}>Crear Nuevo Corredor</h1>
                            <p className={styles.subtitle}>Introduce los datos para crear un corredor</p>
                            <form onSubmit={handleSubmitRunner}>
                                <p className={styles.label}>Nombre del corredor</p>
                                <FormInput
                                    type="text"
                                    value={newRunner.name}
                                    onChange={(value) => setNewRunner({ ...newRunner, name: value })}
                                    placeholder="Introduce el nombre del corredor"
                                    readOnly={!isViewMode}
                                />
                                <p className={styles.label}>Numero del dorsal</p>
                                <FormInput
                                    type="number"
                                    value={newRunner.num_dorsal}
                                    onChange={(value) => setNewRunner({ ...newRunner, num_dorsal: value })}
                                    placeholder="Ingresa el numero del dorsal del corredor"
                                    readOnly={!isViewMode}
                                />

                                <p className={styles.label}>Categoria del corredor</p>
                                <Select
                                    title="Ingresa la categoria del corredor"
                                    data={category.map((c) => (c.name))}
                                    onChange={(value) => setNewRunner({ ...newRunner, category_id: Number(value) })} />

                                <p className={styles.label}>Nombre del equipo</p>
                                <FormInput
                                    type="text"
                                    value={newRunner.team_name}
                                    onChange={(value) => setNewRunner({ ...newRunner, team_name: value })}
                                    placeholder="Ingresa el nombre del equipo del corredor"
                                    readOnly={!isViewMode}
                                />
                                <p className={styles.label}>Afiliado</p>
                                <Select
                                    title="El corredor esta afiliado"
                                    data={subscribe}
                                    onChange={(value) => setNewRunner({ ...newRunner, subscribe: value })} />
                                {error && <p>{error}</p>}
                                <Button type="submit">Guardar</Button>
                            </form>
                        </Modal>
                    )}
                </section>
            </main>
            <footer className={styles.contentFooter}>
                <a className={styles.btnStart} href="/categoryGroup">Iniciar Carrera</a>
            </footer>
        </div>
    );
}
