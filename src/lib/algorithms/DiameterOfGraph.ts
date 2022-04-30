import { Graph } from "../Graph";
import ShortestPath from "./ShortestPath";

/**
 * The diameter of a graph is the maximum shortest distance between any two nodes.
 */
export default function DiameterOfGraph(graph: Graph): [number, Graph] {
    let diameter = -Infinity;
    let result: Graph | undefined = undefined;

    // check every combination of any two nodes
    for (let i = 0; i < graph.size - 1; i++) {
        for (let j = i + 1; j < graph.size; j++) {
            const [length, g] = ShortestPath(graph, i, j);
            if (length > diameter) {
                diameter = length;
                result = g;
            }
        }
    }
    if(!result) throw new Error("Graph is not connected");
    return [diameter, result];
}