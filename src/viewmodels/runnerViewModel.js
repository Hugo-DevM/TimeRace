import { useEffect, useState } from "react";
import { runnerService } from "../models/runnerService";

export function useRunnerViewModel(id) {
    const [runner, setRunner] = useState([]);

    useEffect(() => {
        loadRunners();
    }, []);

    async function loadRunners() {
        const data = await runnerService.getAllRunners(id);
        setRunner(data)
    }
    async function addRunner(data) {
        await runnerService.createRunner(data, id);
        await loadRunners();
    }

    async function alterRunner(data) {
        await runnerService.updateRunner(data, id);
        await loadRunners();
    }

    async function deleteRunner() {
        await runnerService.deleteRunner(id)
        await loadRunners();
    }

    return { runner, addRunner, alterRunner, deleteRunner }
}