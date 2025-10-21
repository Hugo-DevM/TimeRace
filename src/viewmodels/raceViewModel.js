"use client";
import { useState, useEffect } from "react";
import { raceService } from "../models/raceService";

export function useRaceViewModel(id) {
    const [race, setRace] = useState([]);

    useEffect(() => {
        loadRaces();
    }, []);

    async function loadRaces() {
        const data = await raceService.getLeagueById(id);
        setRace(data)
    }
    async function addRace(newRace) {
        await raceService.createRace(newRace, id);
        await loadRaces();
    }

    return { race, addRace };
}
