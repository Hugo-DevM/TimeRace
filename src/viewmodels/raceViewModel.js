"use client";
import { useState, useEffect } from "react";
import { raceService } from "../models/raceService";

export function useRaceViewModel(id) {
    const [race, setRace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLeague = async () => {
            try {
                const data = await raceService.getLeagueById(id);
                setRace(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchLeague();
    }, [id]);

    return { race, loading, error };
}
