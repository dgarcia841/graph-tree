import Queue from "js-priority-queue"

export namespace PriorityQueue {
    export interface IItem<V> {
        value: V,
        priority: number
    }
}

/**
 * Priority queue class
 */
export class PriorityQueue<V> {
    private queue: Queue<PriorityQueue.IItem<V>>;

    /**
     * Creates a priority queue
     * @param comparator The comparator function (by default, function to sort lower priorities at top)
     */
    constructor(comparator = (a: PriorityQueue.IItem<V>, b: PriorityQueue.IItem<V>) => a.priority - b.priority) {
        this.queue = new Queue({
            strategy: Queue.BinaryHeapStrategy,
            comparator
        });
    }
    /**
     * Inserts a value to the queue
     * @param value Value to insert to the queue
     * @param priority Value priority
     */
    public enqueue(value: V, priority: number) {
        this.queue.queue({
            value,
            priority
        });
    }

    /**
     * Gets the item in the top of the queue
     * @returns The obtained item, as [value, priority]
     */
    public dequeue(): [V, number] {
        const item = this.queue.dequeue();
        return [item.value, item.priority];
    }

    /**
     * Removes and return all the values in the queue
     */
    public dequeueAll() {
        const list: V[] = [];
        while (this.queue.length > 0) {
            list.push(this.queue.dequeue().value);
        }
        return list;
    }

    /**
     * Clears the queue
     */
    public clear() {
        this.queue.clear();
    }

    public get length() {
        return this.queue.length;
    }
}