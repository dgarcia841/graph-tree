import { Graph } from "../Graph";

/**
 * Finds the minimun spanning tree of a graph using PRIM's algorithm.
 * Refference: https://www.geeksforgeeks.org/prims-algorithm-simple-implementation-for-adjacency-matrix-representation/
 * @param graph Graph to evaluate
 * @returns A new graph containing the minimun spanning tree and its cost, in the form `[mincost, tree]`.
 */
export default function MinimunSpanningTree(graph: Graph): [number, Graph] {
    // graph that will contain the resulting tree
    const result = new Graph(graph.size);

    // The full list of graph edges, sorted ascending
    const edges = graph.getEdges();

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
     * Checks if an edge is valid to be added to the tree or not.
     * An edge is valid if one of its nodes has been visited, 
     * but no the other one.
     * @param a Initial node of the edge
     * @param b Final node of the edge
     */
    const isValidEdge = (a: number, b: number) => {
        if (a == b) return false;
        return (isVisited(a) && !isVisited(b)) || (!isVisited(a) && isVisited(b));
    }

    // Mark the first node as visited
    visit(0);

    // Counter for # of visited nodes
    let counter = 0;
    // minimun cost
    let mincost = 0;
    // loop until visit every node
    while (counter < graph.size - 1) {
        // Finds the minimun valid edge
        const edge = edges.find(([a, b]) => isValidEdge(a, b));
        // If an edge has been found,
        if (edge) {
            // mark edge nodes as visited
            visit(edge[0]);
            visit(edge[1]);
            // sum edge value to the min cost
            mincost += edge[2];
            // add the edge to the result
            result.setEdge(...edge);
        }
        counter++;
    }
    return [mincost, result];
}