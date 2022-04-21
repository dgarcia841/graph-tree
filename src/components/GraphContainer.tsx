import React, { useEffect, useRef } from "react";
import { GraphDrawing } from "../lib/GraphDrawing";
import { Graph } from "../lib/Graph";

/**
 * React component that renders a graph in the app
 */
export default ({ graph, options, ...props }: {
    /**
     * The graph to draw
     */
    graph: Graph,
    /**
     * graph dragin options
     */
    options?: Partial<GraphDrawing.IOptions>
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const drawing = new GraphDrawing(ref.current, options);
        drawing.setGraph(graph);
        drawing.draw();
        drawing.resize(rect.width, rect.height);
    }, [graph, options, props]);

    return <div ref={ref} {...props}>

    </div>
}