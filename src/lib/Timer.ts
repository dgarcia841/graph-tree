import prettyMs from "pretty-ms"
/**
 * Class for debug elapsed time
 */
export class Timer {

    private readonly start: number;
    /**
     * Starts a timer
     */
    constructor() {
        this.start = performance.now();
    }
    /**
     * Ends the timer and returns the elapsed time
     */
    public end() {
        const end = performance.now();
        return end - this.start;
    }
    /**
     * 
     * Ends the timer and returns the elapsed time formated as string
     */
    public endPretty() {
        return prettyMs(this.end());
    }
}