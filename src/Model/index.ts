import MinimunSpanningTree from "../lib/algorithms/MinimunSpanningTree";
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
    private _onUpdate?: () => void;
    private constructor() { }

    public generateRandomGraph(props: Graph.IGenerateRandomProps) {
        this.graph = Graph.generateRandom(props);
        this.MST = undefined;
    }
    
    public getGraph() {
        return this.graph;
    }
    public setGraph(graph: Graph) {
        this.graph = graph;
        this.MST = undefined;
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
}

export default Model.get()