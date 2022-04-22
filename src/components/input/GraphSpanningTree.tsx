import { Box, Button } from "@mui/material"
import React, { useState } from "react"
import { Graph } from "../../lib/Graph";
import { Timer } from "../../lib/Timer";
import Model from "../../Model";
import AlertList from "../Alert/AlertList";
import useAlert from "../Alert/useAlert";
import GraphContainer from "../GraphContainer";
import prettyMs from "pretty-ms";

export default () => {
    const [tree, setTree] = useState<[number, Graph] | undefined>(undefined);
    const alerts = useAlert();
    function runAlgorithm() {
        const timer = new Timer();
        const tree = Model.getMST();
        const time = prettyMs(timer.end());
        setTree(tree);
        if (tree) {
            alerts.add(`Finished in ${time}. Minimun weight is: ${tree[0]}`, "success", 10e3);
        }
        else {
            alerts.add("Could not calculate minimun spanning tree", "error");
        }
    }
    return <Box>
        <Box m={1}>
            <Button onClick={runAlgorithm} variant="contained">Run algorithm</Button>
        </Box>
        <AlertList control={alerts}/>
        {tree ? <GraphContainer graph={tree[1]} style={{ width: 720, height: 640 }} /> : null}
    </Box>
}