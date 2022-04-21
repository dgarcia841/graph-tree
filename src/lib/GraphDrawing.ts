import Two from "two.js";
import { General } from "./General";
import { Graph } from "./Graph";

/**
 * Class for drawing graphs in the screen. The graphs are drawn
 * as spiral-like regular figures.
 */
export class GraphDrawing {
    /**
     * Drawing options
     */
    public readonly options: Readonly<GraphDrawing.IOptions>;
    /**
     * Renderer instance
     */
    private renderer: Two;
    /**
     * The graph to draw
     */
    private graph?: Graph;
    /**
     * The positions for the nodes to draw
     */
    private nodes: GraphDrawing.IPosition[];

    /**
     * The positions for the edges to draw
     */
    private edges: GraphDrawing.IEdge[];

    /**
     * The drawing size
     */
    private size: GraphDrawing.IPosition;
    /**
     * Creates a new drawing for graphs
     * @param element The HTML element to draw in
     */
    constructor(element: HTMLElement, options: Partial<GraphDrawing.IOptions> = GraphDrawing.defaultOptions) {
        this.options = { ...GraphDrawing.defaultOptions, ...options };
        this.renderer = new Two().appendTo(element);
        this.nodes = [];
        this.edges = [];
        this.size = { x: 0, y: 0 };
    }
    /**
     * Sets the graph to draw
     * @param graph The graph to draw
     */
    public setGraph(graph: Graph) {
        this.graph = graph;

        // Clear the positions list
        this.nodes = [];
        this.edges = [];

        // shortand variables
        const nodes = this.nodes;
        const edges = this.edges;
        const options = this.options;

        // number of required levels for this graph
        const levels = Math.ceil(graph.size / options.levelNodes);

        /// CALCULATE THE POSITION OF ALL NODES

        // Loop over every level
        for (let level = 0; level < levels; level++) {
            // Start node index
            const start = level * options.levelNodes;
            // End node index
            const end = Math.min((level + 1) * options.levelNodes, graph.size);
            // number of nodes to draw in this level
            const count = end - start;
            // angular distance between node
            const deg = 2 * Math.PI / count;
            // calculate the position for every node in this level
            for (let i = start; i < end; i++) {
                // calculate the angle for this node
                const deg_ = (i % options.levelNodes) * deg + options.levelGap * level;
                // calculate the position
                const x = (level + 1) * options.levelRadius * Math.cos(deg_);
                const y = (level + 1) * options.levelRadius * Math.sin(deg_);

                // store the position
                nodes[i] = { x, y };
            }
        }

        // Get maximun x and y positions of the nodes
        const maxX = General.maxValue(nodes.map(xy => xy.x));
        const maxY = General.maxValue(nodes.map(xy => xy.y));

        // adjust the positions of all nodes to center the drawing
        nodes.forEach(xy => {
            xy.x += maxX + options.levelRadius;
            xy.y += maxY + options.levelRadius;
        });

        // Set the drawing dimensions to include all the nodes
        this.size = {
            x: maxX * 2 + options.levelRadius * 2,
            y: maxY * 2 + options.levelRadius * 2
        }
        // Set the renderer size to the drawing size
        this.renderer.width = this.size.x;
        this.renderer.height = this.size.y;

        /// CALCULATE THE POSITION OF ALL EDGES
        // For every node in the graph
        for (let i = 0; i < graph.size; i++) {
            // The current node in the graph
            const from = nodes[i];
            // Get all the nodes connected to the current one
            const connected = graph.getConnectedNodes(i);
            // And for each connected node
            for (let j = 0; j < connected.length; j++) {
                // the connected node
                const to = nodes[connected[j]];
                // store the position and value of the connection edge
                edges.push({
                    a: {
                        x: from.x,
                        y: from.y
                    },
                    b: {
                        x: to.x,
                        y: to.y
                    },
                    value: graph.getEdge(i, connected[j])
                })
            }
        }
    }

    /**
     * Draw the graph
     */
    public draw() {
        if (this.options.drawEdges) {
            this.drawEdges();
        }
        if (this.options.drawNodes) {
            this.drawNodes();
        }
    }

    /**
     * Draw the nodes of the graph
     */
    public drawNodes() {
        if (!this.graph) return;

        this.nodes.forEach(node => {
            // Draw the circle
            const figure = this.renderer.makeCircle(node.x, node.y, 8);
            // Set the border color
            figure.stroke = General.rgbToHex(this.options.nodeStroke);
            // Set the fill color
            figure.fill = General.rgbToHex(this.options.nodeFill);
        });

        this.renderer.update();
    }

    /**
     * Draw the edges of the graph
     */
    public drawEdges() {
        if (!this.graph) return;

        // Maximun finite edge value
        const maxValue = this.graph.getMaxFinite();
        // Loop over every node in the graph
        for (let i = 0; i < this.graph.size; i++) {
            // the current node
            const from = this.nodes[i];
            // get all the nodes connected to the current one
            const nodes = this.graph.getConnectedNodes(i);
            for (let j = 0; j < nodes.length; j++) {
                // draw the line between the current node i, and the connected node j
                const to = this.nodes[nodes[j]];
                const line = this.renderer.makeLine(from.x, from.y, to.x, to.y);

                // get edge value and set the color of the line
                const value = this.graph.getEdge(i, nodes[j]);
                const relative = value / maxValue;
                const rgb = General.interpolateColors(relative, this.options.edgeMin, this.options.edgeMax);
                const hex = General.rgbToHex(rgb);
                line.linewidth = 2;
                line.stroke = hex;
            }
            this.renderer.update();
        }
    }

    /**
     * Gets the drawing renderer
     */
    public getRenderer() {
        return this.renderer;
    }

    /**
     * Sets the size of the drawing
     * @param width Image width
     * @param height Image height
     */
    public resize(width: number, height: number) {
        /**
         * The SVG Dom Element
         */
        const svg = this.renderer.renderer.domElement as SVGElement;
        // drawing size
        const { x, y } = this.size;
        // set view box to the entire drawing
        svg.setAttribute("viewBox", `0 0 ${Math.floor(x)} ${Math.floor(y)}`);
        // set the actual size to the specified values
        svg.setAttribute("width", width + "");
        svg.setAttribute("height", height + "");
    }

    /**
     * Gets the resulting SVG as a object URL
     */
    public getObjectURL(): string {
        /**
         * The SVG Dom Element
         */
        const svg = this.renderer.renderer.domElement as SVGElement;

        // save the current dimensions
        const width = svg.getAttribute("width") ?? "";
        const height = svg.getAttribute("height") ?? "";
        // and clear it
        svg.removeAttribute("width");
        svg.removeAttribute("height");

        // convert to a valid XML source
        const as_text = new XMLSerializer().serializeToString(svg);
        // store in a Blob
        const blob = new Blob([as_text], { type: "image/svg+xml" });
        // create an URI pointing to that blob
        const url = URL.createObjectURL(blob);

        // restore the dimensions
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        return url;
    }
}

export namespace GraphDrawing {
    /**
     * Options for the drawing
     */
    export interface IOptions {
        /**
         * Number of nodes to draw per spiral level
         */
        levelNodes: number,
        /**
         * Radial separation between levels, in pixels
         */
        levelRadius: number,
        /**
         * Angular gap between levels, in radians
         */
        levelGap: number,

        /**
         * RGB color to fill the node circles
         */
        nodeFill?: General.IColor,
        /**
         * RGB color to stroke the node circles
         */
        nodeStroke?: General.IColor,
        /**
         * RGB color for the minimun values in edges
         */
        edgeMin?: General.IColor,
        /**
         * RGB color for the maximun values in edges
         */
        edgeMax?: General.IColor,
        /**
         * When calling `.draw()`, draw the nodes?
         */
        drawNodes?: boolean,
        /**
         * When calling `.draw()`, draw the edges?
         */
        drawEdges?: boolean
    }

    /**
     * A basic position coordinates
     */
    export interface IPosition {
        x: number,
        y: number
    }

    /**
     * Coordinates of an edge
     */
    export interface IEdge {
        a: IPosition,
        b: IPosition,
        value: number
    }
    /**
     * Default drawing options
     */
    export const defaultOptions: Readonly<IOptions> = {
        levelNodes: 8,
        levelRadius: 64,
        levelGap: 0.15,
        nodeFill: General.rgb(128, 128, 255),
        nodeStroke: General.rgb(0, 0, 0),
        edgeMin: General.rgb(255, 0, 0),
        edgeMax: General.rgb(0, 255, 0),
        drawNodes: true,
        drawEdges: true
    }
}