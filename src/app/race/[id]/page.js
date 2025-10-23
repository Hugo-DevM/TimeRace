"use client";
import { useParams } from "next/navigation";
import { useRaceViewModel } from "../../../viewmodels/raceViewModel";
import { useLeagueViewModel } from "../../../viewmodels/leagueViewModel"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "../../../components/Dialog";
import Button from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import styles from "../../../styles/views/race.module.css"
import { IconBack } from "../../../styles/Icons/Icons";



export default function LeagueDetail() {
    const { league } = useLeagueViewModel();
    const { id } = useParams();
    const { races, addRace } = useRaceViewModel(id, "league");
    const [error, setError] = useState("");
    const [isModalShowing, setIsModalShowing] = useState(false);
    const [newRace, setNewRace] = useState({ name: "", race_number: 1, location: "", date: "" })
    const isViewMode = true;

    const currentLeague = league.find((l) => l.id === Number(id));
    const rangeRaceLeague = currentLeague?.num_races ?? 0;
    const nameLeague = currentLeague?.name_league;

    const router = useRouter();



    useEffect(() => {
        setNewRace((prev) => ({
            ...prev,
            race_number: races.length + 1
        }));
    }, [races]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!newRace.name || !newRace.location || !newRace.date) {
            setError("Por favor completa todos los campos");
            return;
        }

        try {
            await addRace({
                name: newRace.name,
                race_number: race.length + 1,
                location: newRace.location,
                date: newRace.date
            });

            setNewRace({ name: "", race_number: 1, location: "", date: "" });
            setError("");

            setTimeout(() => setIsModalShowing(false), 0);
        } catch (err) {
            setError("No se pudo crear la carrera");
        }
    }

    return (
        <main >
            <main>
                <section className={styles.containerLeague}>
                    <div className={styles.contentNav}>
                        <div className={styles.contentItems}>
                            <button
                                className={styles.btnReturn}
                                onClick={() => router.back()}
                            >
                                <IconBack />
                            </button>
                            <h1 className={styles.title}>{nameLeague}</h1>
                        </div>
                        {races.length >= rangeRaceLeague ? (
                            <p >Se alcanzó el número máximo de carreras</p>
                        ) : (
                            <button
                                className={styles.btnNewLeague}
                                onClick={() => setIsModalShowing(true)}
                            >
                                Crear Nueva Carrera
                            </button>
                        )}
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={`${styles.contentCard} ${races.length === 0 ? styles.empty : ""
                        }`}>
                        {races.length > 0 ? (
                            races.map((r) => (
                                <article className={styles.sectionLeague} key={r.id}>
                                    <div className={styles.contentTextLeague}>
                                        <h3 className={styles.subtitleLeague}>{r.name}</h3>
                                        <p className={styles.statusLeague}>{r.state === "pendiente" ? "Pendiente" : "Terminada"}</p>
                                    </div>
                                    <a className={styles.btnGestLeague} href={`/manageRace/${r.id}`}>
                                        Gestionar
                                    </a>
                                </article>
                            ))
                        ) : (<h3 className={styles.textErrorLeague}>No tienes carreras creadas</h3>)}
                    </div>
                </section>

                {isModalShowing && (
                    <Modal isShowing={isModalShowing} onClose={() => setIsModalShowing(false)}>
                        <h1 className={styles.title}>Crear Nueva Carrera</h1>
                        <p className={styles.subtitle}>Introduce los datos para crear una nueva carrera</p>
                        <form onSubmit={handleSubmit}>
                            <p className={styles.label}>Nombre</p>
                            <FormInput
                                type="text"
                                value={newRace.name}
                                onChange={(value) => setNewRace({ ...newRace, name: value })}
                                placeholder="Introduce el nombre de la carrera"
                                readOnly={!isViewMode}
                            />
                            <p className={styles.label}>Numero de carrera</p>
                            <FormInput
                                type="number"
                                value={newRace.race_number}
                                placeholder="Ingresa el numero de carrera"
                                readOnly={isViewMode}
                            />
                            <p className={styles.label}>Lugar</p>
                            <FormInput
                                type="text"
                                value={newRace.location}
                                onChange={(value) => setNewRace({ ...newRace, location: value })}
                                placeholder="Ingresa el lugar de la carrera"
                                readOnly={!isViewMode}
                            />
                            <p className={styles.label}>Fecha</p>
                            <FormInput
                                type="date"
                                value={newRace.date}
                                onChange={(value) => setNewRace({ ...newRace, date: value })}
                                placeholder="Ingresa la fecha de la carrera"
                                readOnly={!isViewMode}
                            />
                            {error && <p>{error}</p>}
                            <Button type="submit">Guardar</Button>
                        </form>
                    </Modal>
                )}
            </main>
        </main>
    );
}
