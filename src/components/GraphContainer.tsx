import React, { useEffect, useRef, useState } from "react";
import { GraphDrawing } from "../lib/GraphDrawing";
import { Graph } from "../lib/Graph";
import { Box, Button, ButtonGroup, Dialog, DialogContent, Paper } from "@mui/material";
import { General } from "../lib/General";

/**
 * React component that renders a graph in the app
 */
export default ({ graph, options, ...props }: {
    /**
     * The graph to draw
     */
    graph: Graph,
    /**
     * graph drawing options
     */
    options?: Partial<GraphDrawing.IOptions>
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {

    const ref = useRef<HTMLDivElement>(null);

    const [viewMatrix, setViewMatrix] = useState(false);

    const svgstr = () => graph.getDrawing()?.getSvgString() ?? "";

    useEffect(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        ref.current.innerHTML = "";
        const drawing = new GraphDrawing(ref.current, options);
        drawing.setGraph(graph);
        graph.setDrawing(drawing);
        drawing.draw();
        drawing.resize(rect.width, rect.height);

        //setUrl(drawing.getObjectURL());
    }, [graph, options, props]);

    return <Box>
        <Box display="flex" justifyContent="flex-end">
            <ButtonGroup variant="outlined">
                <Button onClick={() => setViewMatrix(true)}>View matrix</Button>
                <Button onClick={() => window.open(URL.createObjectURL(new Blob([svgstr()], { type: "image/svg+xml" })))}>
                    Open in new tab
                </Button>
                <Button onClick={() => General.downloadFile("figure.svg", svgstr())}>
                    Download
                </Button>
            </ButtonGroup>
        </Box>
        <Paper elevation={3}>
            <Box display="flex" justifyContent="center">
                <div ref={ref} {...props}></div>
            </Box>
        </Paper>

        <Dialog open={viewMatrix} onClose={() => setViewMatrix(false)}>
            <DialogContent>
                <Box width={640}>
                    <pre>{graph.toString()}</pre>
                </Box>
            </DialogContent>
        </Dialog>
    </Box>
}