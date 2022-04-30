import { Box, Button, Grid } from "@mui/material";
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
    function runAlgorithm() {
        try {
            const timer = new Timer();
            const path = Model.getDiameter();
            const time = timer.endPretty();
            if (!path) {
                alerts.add("Could not calculate diameter", "error");
            }
            else {
                alerts.add(`Finished in ${time}. Diameter is: ${path[0]}.`, "success", 10e3);
                setPath(path);
            }
        }
        catch (e) {
            alerts.add(new String(e).valueOf(), "error");
        }
    }
    return <Box>
        <Box m={1}>
            <Grid container spacing={1}>
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