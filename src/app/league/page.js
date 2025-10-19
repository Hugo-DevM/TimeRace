"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Dialog";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import styles from "../../styles/views/league.module.css"

import { useLeagueViewModel } from "../../viewmodels/leagueViewModel";

export default function ContentRaces() {
    const { league, addLeague } = useLeagueViewModel();
    const [newleague, setNewleague] = useState({ name_league: "", num_races: "" });
    const [isModalShowing, setIsModalShowing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token || role !== 'user') {
            window.location.href = '/';
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!newleague.name_league || !newleague.num_races) {
            setError("Por favor completa todos los campos");
            return;
        }

        try {
            await addLeague({
                name_league: newleague.name_league,
                num_races: newleague.num_races,
            });

            setNewleague({ name_league: "", num_races: "" });
            setError("");

            setTimeout(() => setIsModalShowing(false), 0);
        } catch (err) {
            setError("No se pudo crear la liga");
        }
    }
    return (
        <div>
            <Navbar />
            <main>
                <section className={styles.containerLeague}>
                    <div className={styles.contentTitle}>
                        <h1 className={styles.title}>¡Bienvenido a tus Ligas!</h1>
                        <button className={styles.btnNewLeague} onClick={() => setIsModalShowing(true)}>
                            Crear Nueva Liga
                        </button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={`${styles.contentCard} ${league.length === 0 ? styles.empty : ""
                        }`}>
                        {league.length > 0 ? (
                            league.map((leag) => (
                                <article className={styles.sectionLeague} key={leag.id}>
                                    <div className={styles.contentTextLeague}>
                                        <h3 className={styles.subtitleLeague}>{leag.name_league}</h3>
                                        <p className={styles.statusLeague}>{leag.state === "activa" ? "Activa" : "Terminada"}</p>
                                    </div>
                                    <a className={styles.btnGestLeague} href={`/race/${leag.id}`}>
                                        Ver
                                    </a>
                                </article>
                            ))
                        ) : (<h3 className={styles.textErrorLeague}>No tienes ligas disponibles</h3>)}
                    </div>
                </section>

                {isModalShowing && (
                    <Modal isShowing={isModalShowing} onClose={() => setIsModalShowing(false)}>
                        <h1 className={styles.title}>Crear Nueva Liga</h1>
                        <p className={styles.subtitle}>Introduce los datos para crear una nueva liga</p>
                        <form onSubmit={handleSubmit}>
                            <p className={styles.label}>Nombre</p>
                            <FormInput
                                type="text"
                                value={newleague.name_league}
                                onChange={(value) => setNewleague({ ...newleague, name_league: value })}
                                placeholder="Nombre de la liga"
                            />
                            <p className={styles.label}>Numero de Carreras</p>
                            <FormInput
                                type="number"
                                value={newleague.num_races}
                                onChange={(value) => setNewleague({ ...newleague, num_races: value })}
                                placeholder="Ingresa el numero de carreras"
                            />
                            {error && <p>{error}</p>}
                            <Button type="submit">Guardar</Button>
                        </form>
                    </Modal>
                )}
            </main>
        </div>
    );
}
