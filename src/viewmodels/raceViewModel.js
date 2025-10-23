"use client";
import { useState, useEffect } from "react";
import { raceService } from "../models/raceService";

export function useRaceViewModel(id, mode) {
    const [races, setRaces] = useState([]);
    const [race, setRace] = useState(null);

    useEffect(() => {
        if (!id) return;

        if (mode === "league") {
            loadRacesByLeague(id);
        } else if (mode === "race") {
            loadRaceById(id);
        }
    }, [id, mode]);

    async function loadRacesByLeague() {
        const data = await raceService.getLeagueById(id);
        setRaces(data)
    }
    async function loadRaceById() {
        const data = await raceService.getRaceById(id);
        setRace(data);
    }
    async function addRace(newRace) {
        await raceService.createRace(newRace, id);
        await loadRaces();
    }

    return { races, race, addRace, loadRaceById };
}
