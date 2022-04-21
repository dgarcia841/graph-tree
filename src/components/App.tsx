import React from "react"
import { Graph } from "../lib/Graph";
import GraphContainer from "./GraphContainer";

const grap = Graph.generateRandom({ size: 210, density: 0 });
export default () => {
    return <div>
        <GraphContainer graph={grap} style={{ width: 640, height: 480 }} />
    </div>
}