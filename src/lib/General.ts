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
            result.push(...dequeue);
        }
        array.push(...result);
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
}
