export class Vector {

    private a: Vector.IPoint;
    private b: Vector.IPoint;

    constructor(a: Vector.IPoint, b: Vector.IPoint);
    constructor(x1: number, y1: number, x2: number, y2: number);
    constructor(a_or_x1: Vector.IPoint | number, b_or_y1: Vector.IPoint | number, x2 = 0, y2 = 0) {

        let x1: number = 0;
        let y1: number = 0;

        if (typeof (a_or_x1) == "number") {
            x1 = a_or_x1;
        }
        else {
            x1 = a_or_x1.x;
            y1 = a_or_x1.y;
        }
        if (typeof (b_or_y1) == "number") {
            y1 = b_or_y1;
        }
        else {
            x2 = b_or_y1.x;
            y2 = b_or_y1.y;
        }

        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 };
    }
    public get x1() {
        return this.a.x;
    }
    public set x1(x: number) {
        this.a.x = x;
    }
    public get y1() {
        return this.a.y;
    }
    public set y1(x: number) {
        this.a.y = x;
    }
    public get x2() {
        return this.b.x;
    }
    public set x2(x: number) {
        this.b.x = x;
    }
    public get y2() {
        return this.b.y;
    }
    public set y2(x: number) {
        this.b.y = x;
    }

    public scalar(value: number): Vector {
        const len = this.getSize();
        const dir = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);

        this.x2 = this.x1 + value * len * Math.cos(dir);
        this.y2 = this.y1 + value * len * Math.sin(dir);
        return this;
    }
    public getSize(): number {
        return ((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2) ** 0.5;
    }
    public setSize(value: number): Vector {
        this.scalar( value / this.getSize() );
        return this;
    }
}

export namespace Vector {
    export interface IPoint {
        x: number,
        y: number
    }
}