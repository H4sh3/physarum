import { Walker } from "./walker";
import { random } from './util';
import { diffuse, Field, FieldWrapper } from "./fieldWrapper";


export class State {
    fieldWrapper: FieldWrapper;
    size: { w: number, h: number }
    walkers: Walker[];
    numWalkers: number;

    constructor(w: number, h: number, numWalkers: number) {
        this.size = { w, h }
        this.numWalkers = numWalkers;
    }

    init() {
        this.fieldWrapper = new FieldWrapper(this.size.w, this.size.h);
        this.walkers = initWalker(this.numWalkers, this.size.w, this.size.h)
    }


    step() {
        this.walkers.map(walker => walker.updateDirection(this.fieldWrapper))
        this.walkers.forEach(walker => {
            // inc feromone level
            this.fieldWrapper.increase(walker.pos.x, walker.pos.y)


            if (walker.direction < 0 || walker.direction > 7) {
                console.log(walker.direction)
            }
            const step = directionToPosition(walker.direction)
            walker.pos.x += step.x
            walker.pos.y += step.y


            // set on opposite site if out off bounds
            if (walker.pos.x < 0) {
                walker.pos.x = this.size.w - 1
            }

            if (walker.pos.x > this.size.w) {
                walker.pos.x = 0
            }

            if (walker.pos.y < 0) {
                walker.pos.y = this.size.h - 1
            }

            if (walker.pos.y > this.size.h) {
                walker.pos.y = 0
            }
        })

        this.fieldWrapper.field = diffuse(this.fieldWrapper.field)
        this.fieldWrapper.weaken()
    }
}


export function initWalker(n: number, w: number, h: number): Walker[] {
    const walker: Walker[] = [];
    for (let i = 0; i < n; i++) {
        walker.push(new Walker(random(w - 1), random(h - 1), random(7)))
        // walker.push(new Walker(Math.floor(w / 2), Math.floor(h / 2), random(7)))
    }
    return walker;
}

export function directionToPosition(direction: number): { x: number, y: number } {
    /*
    direction
    7 0 1
    6   2
    5 4 3
    */
    switch (direction) {
        case 0:
            return { x: 0, y: -1 }
        case 1:
            return { x: 1, y: -1 }
        case 2:
            return { x: 1, y: 0 }
        case 3:
            return { x: 1, y: 1 }
        case 4:
            return { x: 0, y: 1 }
        case 5:
            return { x: -1, y: 1 }
        case 6:
            return { x: -1, y: 0 }
        case 7:
            return { x: -1, y: -1 }
    }
}

export function relevantDirections(direction: number) {
    const left = direction - 1 < 0 ? 7 : direction - 1
    const right = direction + 1 > 7 ? 0 : direction + 1
    return [left, right]
}