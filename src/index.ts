import { Graph } from "./lib/Graph";


window.onload = () => {
    const grap = Graph.fromString(`
    0 1 1 2
    2 0 1 1
    1 0 0 1
    0 3 0 
    `);
    document.write(`<pre>${grap.toString()}</pre>`);
}