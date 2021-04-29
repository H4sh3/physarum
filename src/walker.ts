import { FieldWrapper } from './fieldWrapper';
import { relevantDirections, directionToPosition } from './state';
import { random } from './util'

type Position = {
    x: number,
    y: number
}

export class Walker {
    pos: Position;
    direction: number;

    constructor(x: number, y: number, direction: number) {
        this.pos = { x, y };
        this.direction = direction;
    }

    updateDirection(field: FieldWrapper) {
        const leftRight = relevantDirections(this.direction)
        const sensorForward = directionToPosition(this.direction)

        const sensors = getSensorOffsets(this.direction)

        const sensorLength = 9;

        const left = field.get(this.pos.x + (sensors.left.x * sensorLength), this.pos.y + (sensors.left.y * sensorLength))
        const forward = field.get(this.pos.x + (sensorForward.x * sensorLength), this.pos.y + (sensorForward.y * sensorLength))
        const right = field.get(this.pos.x + (sensors.right.x * sensorLength), this.pos.y + (sensors.right.y * sensorLength))

        if (forward > left && forward > right) {
            // keep direction
        } else if (forward < right && forward < left) {
            this.direction = [leftRight[0], leftRight[1]][random(1)] // indeed
        } else if (left > right) {
            this.direction = leftRight[0]
        } else if (right > left) {
            this.direction = leftRight[1]
        }
    }
}

function getSensorOffsets(direction: number): { left: { x: number, y: number }, right: { x: number, y: number } } {
    /*  
        . 7 . 0 .
        6 7 0 1 1
        . 6 i 2 .
        5 5 4 3 2
        . 4 . 3 . 
    */
    const sensors = {
        0: { left: getOffset(7), right: getOffset(0) },
        1: { left: getOffset(0), right: getOffset(1) },
        2: { left: getOffset(1), right: getOffset(2) },
        3: { left: getOffset(2), right: getOffset(3) },
        4: { left: getOffset(3), right: getOffset(4) },
        5: { left: getOffset(4), right: getOffset(5) },
        6: { left: getOffset(5), right: getOffset(6) },
        7: { left: getOffset(6), right: getOffset(7) },
    }

    /*  
        7 . 0 . 1
        . . . . .
        6 . i . 2
        . . . . .
        5 . 4 . 3 
    */

    return sensors[direction]
}

function getOffset(direction: number) {
    switch (direction) {
        case 0:
            return { x: -1, y: -2 }
        case 1:
            return { x: 1, y: -2 }
        case 2:
            return { x: 2, y: -1 }
        case 3:
            return { x: 2, y: 1 }
        case 4:
            return { x: 1, y: 2 }
        case 5:
            return { x: -1, y: 2 }
        case 6:
            return { x: -2, y: 1 }
        case 7:
            return { x: -2, y: -1 }
    }
}