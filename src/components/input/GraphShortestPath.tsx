import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Graph } from "../../lib/Graph";
import { Timer } from "../../lib/Timer";
import Model from "../../Model";
import AlertList from "../Alert/AlertList";
import useAlert from "../Alert/useAlert";
import GraphContainer from "../GraphContainer";

export default () => {
    const alerts = useAlert();
    const [path, setPath] = useState<[number, Graph] | undefined>(undefined);
    const [from, setFrom] = useState<number | undefined>(undefined);
    const [to, setTo] = useState<number | undefined>(undefined);
    function runAlgorithm() {
        if (from === undefined || to === undefined) {
            alerts.add("Please select a start and end node", "error");
            return;
        }
        try {
            const timer = new Timer();
            const path = Model.getShortestPath(from, to);
            const time = timer.endPretty();
            if (!path) {
                alerts.add("Could not calculate the shortest path", "error");
            }
            else {
                const route = [from, ...path[1].getEdges().map(edge => edge[1])].join(" -> ");
                setPath(path);
                alerts.add(`Finished in ${time}. Shortest distance is: ${path[0]}. Path is: ${route}`, "success", 10e3);
            }
        }
        catch (e) {
            alerts.add(new String(e).valueOf(), "error");
        }
    }
    /**
     * Updates a value when a numeric input changes
     * @param event Event triggered by input change event
     * @param updater Function to call passing the changed numeric value as parameter
     * @param props min, max and places
     */
     function updateNumber(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        updater: (x: number) => void,
        props: { min?: number, max?: number, places?: number } = { min: 0, max: NaN, places: 0 }) {
        let number = parseFloat(event.target.value);
        if (Number.isFinite(props.places)) {
            const places = props.places ?? 0;
            number = parseFloat(number.toFixed(places));
        }
        if (!Number.isFinite(number)) {
            number = 0;
        }
        if (Number.isFinite(props.min)) {
            number = Math.max(props.min ?? 0, number);
        }
        if (Number.isFinite(props.max)) {
            number = Math.min(props.max ?? 0, number);
        }
        updater(number);
    }
    return <Box>
        <Box m={1}>
            <Grid container spacing={1}>
                <Grid item xs="auto">
                    <TextField
                        label="origin"
                        type="number"
                        value={from ?? ""}
                        onChange={(event) => updateNumber(event, setFrom, { min: 0 })}
                    />
                </Grid>
                <Grid item xs="auto">
                    <TextField
                        label="destination"
                        type="number"
                        value={to ?? ""}
                        onChange={(event) => updateNumber(event, setTo, { min: 0 })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={runAlgorithm}>
                        Run the algorithm
                    </Button>
                </Grid>
            </Grid>
            
        </Box>
        <AlertList control={alerts} />
        {path ? <GraphContainer graph={path[1]} style={{ width: 720, height: 640 }} /> : null}
    </Box>
}