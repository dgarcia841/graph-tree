import DiameterOfGraph from "../lib/algorithms/DiameterOfGraph";
import MinimunSpanningTree from "../lib/algorithms/MinimunSpanningTree";
import ShortestPath from "../lib/algorithms/ShortestPath";
import { Graph } from "../lib/Graph";

class Model {

    private static model: Model;

    public static get(): Model {
        if (!this.model) {
            this.model = new Model();
        }
        return this.model;
    }

    private graph?: Graph;
    private MST?: [number, Graph];
    private shortestPath?: [number, Graph];
    private shortestPathNodes?: [number, number];
    private diameter?: [number, Graph];
    private _onUpdate?: () => void;
    private constructor() { }

    public generateRandomGraph(props: Graph.IGenerateRandomProps) {
        this.graph = Graph.generateRandom(props);
        this.MST = undefined;
        this.shortestPath = undefined;
        this.shortestPathNodes = undefined;
    }
    
    public getGraph() {
        return this.graph;
    }
    public setGraph(graph: Graph) {
        this.graph = graph;
        this.MST = undefined;
        this.shortestPath = undefined;
        this.shortestPathNodes = undefined;
    }

    public onUpdate(event: () => void) {
        this._onUpdate = event;
        return this;
    }

    public update() {
        this._onUpdate?.();
        return this;
    }

    public getMST() {
        if (!this.graph) return undefined;
        if (!this.MST) {
            this.MST = MinimunSpanningTree(this.graph);
        }
        return this.MST;
    }

    public getShortestPath(a: number, b: number) {
        if (!this.graph) return undefined;
        // Return the existing shortest path, if extists.
        if (this.shortestPath && this.shortestPathNodes &&
            this.shortestPathNodes[0] == a && this.shortestPathNodes[1] == b) {
            return this.shortestPath;
        }
        this.shortestPath = ShortestPath(this.graph, a, b);
        this.shortestPathNodes = [a, b];
        return this.shortestPath;
    }

    public getDiameter() {
        if (!this.graph) return undefined;
        if (!this.diameter) {
            this.diameter = DiameterOfGraph(this.graph);
        }
        return this.diameter;
    }
}

export default Model.get()