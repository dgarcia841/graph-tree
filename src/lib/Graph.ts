import { General } from "./General";

/**
 * The Graph class. Unexisting edges are set as Infinity.
 */
export class Graph {
    /**
     * Adjacency matrix
     */
    private matrix: number[][];

    /**
     * Creates a graph
     * @param size Number of nodes of the graph
     */
    constructor(size: number) {
        this.matrix = new Array(size).fill(0).map(() => new Array(size).fill(Infinity));
    }
    /**
     * Number of nodes of the graph
     */
    public get size() {
        return this.matrix.length;
    }

    /**
     * Gets the value of an edge between two nodes, or Infinity if they're not
     * directly connected.
     * @param a Origin node
     * @param b Destination node
     * @returns Edge value
     */
    public getEdge(a: number, b: number) {
        return this.matrix[b][a];
    }
    /**
     * Sets the value of an edge between two nodes, or Infinity if they're not
     * directly connected.
     * @param a Origin node
     * @param b Destination node
     * @param value Edge new value
     * @returns New value
     */
    public setEdge(a: number, b: number, value: number) {
        return this.matrix[b][a] = value;
    }
    /**
     * Gets a list with all the nodes connected to the specified one.
     * @param a Origin node
     * @returns List of connected nodes
     */
    public getConnectedNodes(a: number) {
        return this.matrix
            .map((row, i) => [row[a], i])
            .filter(([row]) => Number.isFinite(row))
            .map(([_, i]) => i);
    }
    /**
     * Gets the max non-Infinity value in the adjacency matrix. This is,
     * the edge with higher finite value.
     */
    public getMaxFinite() {
        let max = -Infinity;
        this.matrix.forEach(row => {
            row.forEach(x => {
                if (Number.isFinite(x) && x > max) {
                    max = x;
                }
            });
        });
        return max;
    }
    /**
     * Converts the graph's adjacency matrix to string
     * @param param0 separator strings
     * @returns formatted string
     */
    public toString(props: {
        /**
         * String that separates one edge value from another
         */
        valueSeparator?: string,
        /**
         * String that separates one row from another
         */
        lineSeparator?: string,
        /**
         * String that will be placed on every Infinity edge value
         */
        infinityString?: string
    } = {
            valueSeparator: ", ",
            lineSeparator: "\n",
            infinityString: "*"
        }) {
        return this.matrix
            .map(row => row
                .map(x => Number.isFinite(x) ? x : props.infinityString)
                .join(props.valueSeparator))
            .join(props.lineSeparator);
    }

    /**
     * Generates a random **connected** graph. It will connect all the
     * created nodes with a single path, and then will randomly add
     * more edges between the nodes.
     * @param param0 Generation properties
     * @returns Generated graph
     */
    public static generateRandom({
        size = 0,
        directed = false,
        min = 1,
        max = 10,
        density = 0.1
    }: {
        /**
         * Number of nodes
         */
        size?: number,
        /**
         * Is the graph directed or not?
         */
        directed?: boolean,
        /**
         * Minimun edge value
         */
        min?: number,
        /**
         * Maximun edge value
         */
        max?: number,
        /**
         * Probability of creating additional edges between nodes, where
         * `density = 1` means that every single node will be connected
         * to every other in the graph, and `density = 0` means that
         * the only edges that will be created are those that
         * connect all the nodes in a single path.
         */
        density?: number
    }) {

        // 1. Creates an unconnected graph of the specified size
        const grap = new Graph(size);

        // 2. Connect every node in the graph
        // 2.1. Creates a list from 0 to n - 1 and shuffles it
        const path = General.shuffle(new Array(size).fill(0).map((_, i) => i));
        // 2.2. Group the generated list items as pairs of nodes, and connect them
        for (let i = 0; i < size - 1; i++) {
            // 2.3. Get the pair
            const a = path[i];
            const b = path[i + 1];
            // 2.4. Generate a random value for the edge
            const v = General.irandom(min, max);
            // 2.5. Set the edge
            grap.setEdge(a, b, v);
            // 2.6. If the graph is not directed,
            if (!directed) {
                // 2.6.1. Set the same value to the edge in counter direction 
                // (transposed index in the matrix)
                grap.setEdge(b, a, v);
            }
            else {
                // 2.6.2. Otherwise, set a new random value to the transposed index
                grap.setEdge(b, a, General.irandom(min, max));
            }
        }
        //3. Randomly create more edges between nodes.

        // 3.1. Loop over upper-right diagonal half of the matrix
        /**
         * -****
         * --***
         * ---**
         * ----*
         */
        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                // 3.2. If there is not a connection
                if (!Number.isFinite(grap.getEdge(i, j))) {
                    // 3.3. Randomly take one of two decisions: to set an edge with a random value,
                    // or not to set the edge. The input that determines how likely is a decision to
                    // be taken is the parameter `density`.
                    const v = General.chance(density) ? General.irandom(min, max) : Infinity;
                    // 3.4. Set the edge
                    grap.setEdge(i, j, v);
                    // 3.5. If the edge is not directed
                    if (!directed) {
                        // 3.5.1. Set the same value to the edge in counter direction 
                        // (transposed index in the matrix)
                        grap.setEdge(j, i, v);
                    }
                    else {
                        // 3.5.2. Otherwise, set a new random value to the transposed index
                        grap.setEdge(j, i, General.irandom(min, max));
                    }
                }
            }
        }
        return grap;
    }

    /**
     * Creates a new graph from an adjacency matrix as a string.
     * It can be used any character as separator, only numeric 
     * string patterns (including E notation, like 2e3), and "*"
     * character representing Infinity, will be parsed.
     * 
     * The input matrix must be square, otherwise an error will be
     * thrown.
     * @param string The adjacency matrix as string
     */
    public static fromString(string: string): Graph {
        const values = Array.from(string.matchAll(/(?:(?:\+|-)?\d+(?:\.\d+)?(?:e(?:\+|-)?\d+(?:\.\d+)?)?|\*)/ig))
            .map(str => str[0] == "*" ? Infinity : parseFloat(str[0]));
        
        /**
         * Square root of the number of values in the adjacency matrix
         */
        const sqrtlen = values.length ** 0.5;
        /**
         * The number of nodes is the square root of the number of values in the adjacency matrix
         */
        const isqrtlen = Math.floor(sqrtlen);

        // If the square root of the number of elements in the matrix is not an integer
        if (!General.equals(sqrtlen, isqrtlen)) {
            // Then the matrix is not square
            throw new Error("The input matrix must be square");
        }
        // Create the graph
        const grap = new Graph(isqrtlen);
        // Loop over the matrix values as (x,y) coordinates
        for (let y = 0; y < isqrtlen; y++) {
            for (let x = 0; x < isqrtlen; x++) {
                // convert the (x, y) coordinates to array positions
                const i = y * isqrtlen + x;
                // and set the edge value
                grap.setEdge(x, y, values[i]);
            }
        }
        return grap;
    }
}
