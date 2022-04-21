import { Box, TextField, Button, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Graph } from "../../lib/Graph";
import Model from "../../Model"
import AlertList from "../Alert/AlertList";
import useAlert from "../Alert/useAlert";

function getGraphString() {
    return Model.getGraph()?.toString() ?? "";
}

function Field({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    
    const [text, setText] = useState(value);

    useEffect(() => setText(value), [value]);

    return <Grid container spacing={1}>
        <Grid item xs={12}>
            <TextField
                value={text}
                onChange={ev => setText(ev.target.value)}
                multiline
                maxRows={20}
                inputProps={{
                    style: {
                        whiteSpace: "pre"
                    }
                }}
                sx={{
                    width: "100%",
                    fontFamily: "monospace",
                }} />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={() => onChange(text)}>accept</Button>
        </Grid>
    </Grid>
}
export default () => {

    const alerts = useAlert();

    function updateGraph(text: string) {
        try {
            const graph = Graph.fromString(text);
            Model.setGraph(graph);
            alerts.add("Graph created successfully", "success");
            Model.update();
        }
        catch (e) {
            alerts.add(new String(e).valueOf(), "error");
        }
    }

    return <React.Fragment>
        <Box m={1}>
            <Field value={getGraphString()} onChange={updateGraph} />
        </Box>
        <Box m={1}>
            <AlertList control={alerts} />
        </Box>
    </React.Fragment>
}