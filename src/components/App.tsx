import React from "react"
import { General } from "../lib/General";
import { Graph } from "../lib/Graph";
import GraphContainer from "./GraphContainer";

const graps = General.makeArray(100, () => Graph.generateRandom({ size: General.irandom(10, 250), density: 0 }));
export default () => {
    return <div>
        {graps.map(grap => <GraphContainer
            graph={grap}
            style={{
                width: 640,
                height: 480,
                display: "inline-block"
            }} />)}
    </div>
}