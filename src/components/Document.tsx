import { Link, List, ListItem, ListItemText, Typography } from "@mui/material"
import React, { useReducer } from "react"
import Model from "../Model"
import GraphDiameter from "./input/GraphDiameter"
import GraphField from "./input/GraphField"
import GraphGenerate from "./input/GraphGenerate"
import GraphShortestPath from "./input/GraphShortestPath"
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
            This program implements the PRIM's algorithm to find the minimun spanning tree
            for a provided connected graph, and the Djikstra algorithm to find the shortest
            path between two nodes in the provided graph.
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
        <Typography variant="h2">
            Find the shortest path
        </Typography>
        <Typography variant="body1">
            Find the shortest path between two nodes in the graph by using Djikstra's algorithm.
        </Typography>
        <GraphShortestPath />
        <Typography variant="h2">
            Find the diameter
        </Typography>
        <Typography variant="body1">
            Find the diameter of the graph. This is the maximum shortest path between any two nodes.
        </Typography>
        <GraphDiameter />

        <Typography variant="h2">
            References
        </Typography>
        <List>
            <ListItem>
                <ListItemText>
                    Minimun spanning tree:
                    <Link target="_blank" href="https://www.geeksforgeeks.org/prims-algorithm-simple-implementation-for-adjacency-matrix-representation/">
                        Geeksforgeeks.org
                    </Link>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    Shortest path:
                    <Link target="_blank" href="https://www.codingame.com/playgrounds/7656/los-caminos-mas-cortos-con-el-algoritmo-de-dijkstra/el-algoritmo-de-dijkstra">
                        Codingame.com
                    </Link>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    Graph diameter:
                    <Link target="_blank" href="https://mathworld.wolfram.com/GraphDiameter.html">
                        Mathworld.wolfram.com
                    </Link>
                </ListItemText>
            </ListItem>
        </List>
    </React.Fragment>
}