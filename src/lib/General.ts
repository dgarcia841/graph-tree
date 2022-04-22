export namespace General {
    /**
     * Generates a random integer number between the given limit values
     * @param min Minimun generated value (inclusive)
     * @param max Maximun generated value (exclusive)
     * @returns Random integer between given limits
     */
    export function irandom(min: number, max: number) {
        return min + Math.floor((max - min) * Math.random());
    }

    /**
     * Choose a random element from the specified values
     * @param args Elements to choose
     */
    export function choose<T>(...args: T[]): T {
        return args[irandom(0, args.length)];
    }
    /**
     * Shuffles an array. **NOTE:** It **does mutate** the original array,
     * instead of making a copy.
     * @param array Array to shuffle
     * @returns Same array, after shuffle
     */
    export function shuffle<T>(array: T[]): T[] {
        const result: T[] = [];
        while (array.length > 0) {
            const index = irandom(0, array.length);
            const dequeue = array.splice(index, 1);
            dequeue.forEach(x => result.push(x));
        }
        result.forEach(x => array.push(x));
        return array;
    }
    /**
     * Triggers a random event with the specified success probability
     * @param P Sucess probability
     * @returns Success (true) or failure (false)
     */
    export function chance(P: number) {
        return Math.random() <= P;
    }

    /**
     * Minimun tolerance for number difference
     */
    export const tolerance = 1e-6;
    /**
     * Checks whether two numbers are aproximately equals 
     * (using a defined tolerance value) or not
     * @param a First number to compare
     * @param b Second number to compare
     * @returns Where numbers are equals or not
     */
    export function equals(a: number, b: number) {
        return Math.abs(a - b) <= tolerance;
    }

    /**
     * Gets the maximun value in a numbers list
     * @param values List of value to check
     * @returns Max value in the list
     */
    export function maxValue(values: number[]) {
        let max = -Infinity;
        for (let i = 0; i < values.length; i++) {
            if (values[i] > max) {
                max = values[i];
            }
        }
        return max;
    }

    /**
     * RGB Color representation
     */
    export interface IColor {
        /**
         * RED component (1-255)
         */
        r: number,
        /**
         * GREEN component (1-255)
         */
        g: number,
        /**
         * BLUE component (1-255)
         */
        b: number
    }

    export function rgb(r: number, g: number, b: number): IColor {
        return { r, g, b };
    }
    /**
     * Interpolates a value between two colors
     * @param value Value to interpolate, between 0 and 1.
     * @param colorA Initial color (value = 0)
     * @param colorB Final color (value = 1)
     * @returns Interpolared color
     */
    export function interpolateColors(value: number, colorA?: IColor, colorB?: IColor): IColor {
        if (!colorA) colorA = rgb(0, 0, 0);
        if (!colorB) colorB = rgb(0, 0, 0);
        const interpolate = (v: number, a: number, b: number) => Math.floor(a + (b - a) * v);
        const r = interpolate(value, colorA.r, colorB.r);
        const g = interpolate(value, colorA.g, colorB.g);
        const b = interpolate(value, colorA.b, colorB.b);

        return { r, g, b };
    }

    /**
     * Converts a RGB color object into a #RRGGBB hex string
     * @param color RGB color object
     */
    export function rgbToHex(color?: IColor): string {
        if (!color) return "#000000";
        /**
         * Convert to HEX
         */
        const hex = (x: number) => Math.floor(Math.max(0, Math.min(255, x))).toString(16);
        /**
         * Adjust to two digits
         */
        const two = (x: string) => "0".repeat(Math.max(0, 2 - x.length)) + x;

        return "#" + two(hex(color.r)) + two(hex(color.g)) + two(hex(color.b));
    }

    /**
     * Creates and array and uses a function to map the elements in it
     * @param size The array size
     * @param map The function to map the elements
     * @returns The created array
     */
    export function makeArray<T>(size: number, map: (index: number) => T): T[] {
        return new Array(size).fill(0).map((_, i) => map(i));
    }

    /**
     * Downloads a file to the client
     * @param filename Filename
     * @param content File content
     */
     export function downloadFile(filename: string, content: string) {
        const element = document.createElement("a");
        element.style.display = "none";
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
        element.setAttribute("download", filename);

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}
