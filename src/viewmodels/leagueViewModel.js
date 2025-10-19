import { leagueService } from "../models/leagueService";
import { use, useEffect, useState } from "react";


export function useLeagueViewModel() {
    const [league, setLeague] = useState([]);

    useEffect(() => {
        loadLeague();
    }, []);

    async function loadLeague() {
        const data = await leagueService.getAllLeagues();
        setLeague(data);
    }
    async function addLeague(newLeague) {
        await leagueService.createLeague(newLeague);
        await loadLeague();
    }

    return { league, loadLeague, addLeague };
}