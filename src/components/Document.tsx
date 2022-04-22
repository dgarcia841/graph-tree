import { Typography } from "@mui/material"
import React, { useReducer } from "react"
import Model from "../Model"
import GraphField from "./input/GraphField"
import GraphGenerate from "./input/GraphGenerate"
import GraphSpanningTree from "./input/GraphSpanningTree"
import GraphVisualize from "./input/GraphVisualize"

export default () => {
    const [, update] = useReducer(x => (x + 1) % 13, 0);
    Model.onUpdate(update);

    return <React.Fragment>
        <Typography variant="h1">
            Graphs algorithms
        </Typography>
        <Typography variant="subtitle1">
            This program implements the minimun spanning tree algorithm for a connected graph, and
            finds the shortest path between two points in the resulting minimun spanning tree.
        </Typography>
        <Typography variant="subtitle1">
            By Daniel García, 2022.
        </Typography>
        <Typography variant="h2">
            Input the graph
        </Typography>
        <Typography variant="body1">
            Input the graph representation as an adjacency matrix in the following text field.
            Any non-numeric character can be used as separator, and number of input values must
            be a perfect square. The character <code>*</code> represents an infinity value,
            so it can be used to specify unconnected nodes.
        </Typography>
        <GraphField />
        <Typography variant="body1">
            An input connected graph can also be automatically generated using the following parameters:
        </Typography>
        <GraphGenerate />
        <Typography variant="h2">
            Visualize the graph
        </Typography>
        <GraphVisualize />
        <Typography variant="h2">
            Find the minimun spanning tree
        </Typography>
        <Typography variant="body1">
            Find the input graph's minimun spanning tree by using an implementation of PRIM's algorithm.
        </Typography>
        <GraphSpanningTree />
    </React.Fragment>
}