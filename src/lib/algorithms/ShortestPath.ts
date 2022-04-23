import { General } from "../General";
import { Graph } from "../Graph";

/**
 * Finds the shortest path bewteen two nodes in the provided graph, using
 * Djikstra algorithm.
 * 
 * Refference: https://www.codingame.com/playgrounds/7656/los-caminos-mas-cortos-con-el-algoritmo-de-dijkstra/el-algoritmo-de-dijkstra
 * @param graph Graph to evaluate
 * @param a Origin node
 * @param b Destination node
 * @returns The cost of the sortest path, and a new graph containing the path itself, 
 * in the form [cost, path]
 */
export default function ShortestPath(graph: Graph, a: number, b: number): [number, Graph] {
    // cancel the algorithm if the nodes are out of range
    if (a < 0 || a >= graph.size || b < 0 || b >= graph.size) {
        throw new Error("Provided nodes must be in the graph");
    }
    // graph that will contain the resulting path
    const result = new Graph(graph.size);

    // Array to store the minimun distance between the origin 
    // node(a) and every other node in the graph. Initially infinity.
    const distances = General.makeArray(graph.size, () => Infinity);

    // list of visited nodes
    const visited: boolean[] = [];
    /**
     * Checks if a node has been visited or not
     * @param node The node to check
     * @returns Whether node is visited or not
     */
    const isVisited = (node: number) => !!visited[node];

    /**
     * Marks a node as visited
     * @param node The node to visit
     */
    const visit = (node: number) => visited[node] = true;

    /**
     * Gets the unvisited node with the minimun distance,
     * or undefined if there're not unvisited nodes
     */
    const getUnvisitedMinimun = () => {
        let node = undefined;
        let distance = Infinity;
        for (let i = 0; i < graph.size; i++) {
            if (distances[i] < distance && !isVisited(i)) {
                distance = distances[i];
                node = i;
            }
        }
        return node;
    }

    // List with all the nodes in the minimun path between origin and the other nodes
    const paths: number[][] = General.makeArray(graph.size, () => []);

    // Minimun distance from the origin to itself is 0, this is the first node to be checked
    distances[a] = 0;
    // The origin has an initial path to itself
    paths[a] = [a];

    // Current node
    let current: number | undefined;
    // Loop while there're unvisited nodes left
    while ((current = getUnvisitedMinimun()) !== undefined) {
        // if no unvisited node found, end the loop
        if (current == undefined) break;

        const c = current;
        // Check all the nodes connected to the current
        const connected = graph.getConnectedNodes(c);

        connected.forEach(other => {
            // Only check unvisited nodes
            if (isVisited(other)) return;
            // total distance between the current and the other node
            const distance = graph.getEdge(c, other) + distances[c];
            // Store the minimun total distance between the nodes
            if (distance < distances[other]) {
                // update the minimun distance
                distances[other] = distance;
                // and update the path, as the path to the current + the other
                paths[other] = [...paths[c], other];
            }
        });
        // Visit the current nodes
        visit(c);
    }

    // when the finding ends, move the shortest path from a to b into the resulting graph
    const path = paths[b];
    for (let i = 0; i < path.length - 1; i++) {
        // get the nodes
        const from = path[i];
        const to = path[i + 1];
        // and insert the edge
        result.setEdge(from, to, graph.getEdge(from, to));
    }

    return [distances[b], result];
}