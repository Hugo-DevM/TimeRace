"use client";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { useRaceViewModel } from "../../../viewmodels/raceViewModel";

export default function LeagueDetail() {
    const { id } = useParams();
    const { race, loading, error } = useRaceViewModel(id);

    if (loading) return <p >Cargando...</p>;
    if (error) return <p >{error}</p>;

    return (
        <div>
            <Navbar />
            <main >
                <h1 >Detalles de la Liga</h1>
                <div>
                    <p><strong>Nombre:</strong> {race.name_league}</p>
                    <p><strong>Número de Carreras:</strong> {race.num_races}</p>
                    <p><strong>Estado:</strong> {race.state}</p>
                </div>
            </main>
        </div>
    );
}
