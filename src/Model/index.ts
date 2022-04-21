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
    private _onUpdate?: () => void;
    private constructor() { }

    public generateRandomGraph(props: Graph.IGenerateRandomProps) {
        this.graph = Graph.generateRandom(props);
    }
    
    public getGraph() {
        return this.graph;
    }
    public setGraph(graph: Graph) {
        this.graph = graph;
    }

    public onUpdate(event: () => void) {
        this._onUpdate = event;
        return this;
    }

    public update() {
        this._onUpdate?.();
        return this;
    }
}

export default Model.get()