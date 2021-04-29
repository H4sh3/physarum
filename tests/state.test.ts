import { State, getEmptyField, relevantDirections } from "../lib/state";
import { Walker } from "../lib/walker";

describe('state should work', function () {
    it('should create and init', function () {
        const w = new State(10, 50, 50);
        expect(w).toBeDefined()
        expect(w.field).toBeUndefined()
        expect(w.walkers).toBeUndefined()
        w.init()
        expect(w.field).toBeDefined()
        expect(w.walkers).toBeDefined()
    });

    it('should let a walker step', function () {
        const field = getEmptyField(3, 3);
        /*
        2 0 0 
        1 w 0
        3 0 0
        */
        field[0][0] = 2;
        field[0][1] = 1;
        field[0][2] = 3;

        const walker = new Walker(1, 1, 7);

        expect(walker.direction).toBe(7)

        walker.updateDirection(field)

        expect([0, 7, 6].includes(walker.direction)).toBeTruthy()


        /*
        direction
        0 1 2
        7   3
        6 5 4
        */


    });

    it('should return neighbour directions of current direction', function () {
        /*
        direction
        0 1 2
        7   3
        6 5 4
        */
        let n: number[] = relevantDirections(7)
        expect(n[0]).toBe(6)
        expect(n[1]).toBe(0)

        n = relevantDirections(4)
        expect(n[0]).toBe(3)
        expect(n[1]).toBe(5)

        n = relevantDirections(2)
        expect(n[0]).toBe(1)
        expect(n[1]).toBe(3)
    });

});