import React from "react"
import { General } from "../lib/General";
import { Graph } from "../lib/Graph";
import GraphContainer from "./GraphContainer";

const graps = General.makeArray(100, () => Graph.generateRandom({ size: General.irandom(10, 50), density: 0.3 }));
export default () => {
    return <div>
        {graps.map((grap, i) => <GraphContainer
            key={i}
            graph={grap}
            options={{
                drawNodes: true,
                drawEdges: i % 2 == 0
            }}
            style={{
                width: 640,
                height: 480,
                display: "inline-block"
            }} />)}
    </div>
}