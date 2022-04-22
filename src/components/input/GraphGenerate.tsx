import { Box, Grid, TextField, Button, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { Timer } from "../../lib/Timer";
import Model from "../../Model";
import AlertList from "../Alert/AlertList";
import useAlert from "../Alert/useAlert";

export default () => {

    const [size, setSize] = useState(64);
    const [density, setDensity] = useState(0.1);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(10);

    const alerts = useAlert();

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

    function generateGraph() {
        const timer = new Timer();
        Model.generateRandomGraph({ size, density, min, max });
        const time = timer.endPretty();
        Model.update();
        alerts.add(`Finished in ${time}. Graph generated successfully`, "success");
    }

    return <Box m={1}>
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Tooltip placement="top" title="Number of nodes of the graph">
                    <TextField
                        label="Number of nodes"
                        type="number"
                        value={size}
                        onChange={ev => updateNumber(ev, setSize)} />
                </Tooltip>
            </Grid>
            <Grid item xs={3}>
                <Tooltip placement="top" title="How likely will be to create an edge between two nodes">
                    <TextField
                        label="Edge density"
                        type="number"
                        value={density}
                        onChange={ev => updateNumber(ev, setDensity, {min: 0, max: 1, places: NaN})}  />
                </Tooltip>
            </Grid>
            <Grid item xs={3}>
                <Tooltip placement="top" title="Minimun value for an edge">
                    <TextField
                        label="Minimun value"
                        type="number"
                        value={min} 
                        onChange={ev => updateNumber(ev, setMin)} />
                </Tooltip>
            </Grid>
            <Grid item xs={3}>
                <Tooltip placement="top" title="Maximun value for an edge">
                    <TextField
                        label="Maximun value"
                        type="number"
                        value={max}
                        onChange={ev => updateNumber(ev, setMax)}  />
                </Tooltip>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" onClick={generateGraph}>Generate</Button>
            </Grid>
            <Grid item xs={12}>
                <AlertList control={alerts}/>
            </Grid>
        </Grid>
    </Box>
}