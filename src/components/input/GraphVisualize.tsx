import { Chip } from "@mui/material";
import React from "react";
import Model from "../../Model";
import GraphContainer from "../GraphContainer";

export default () => {
    const graph = Model.getGraph();
    if (!graph) return <Chip label="No graph has been input" />;
    return <GraphContainer graph={graph} style={{ width: 720, height: 640 }} />;
}