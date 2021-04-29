import { Walker } from '../lib/walker';

describe('calculate', function () {
    it('add', function () {
        const w = new Walker(1, 2, 3);
        expect(w).toBeDefined()
        expect(w.pos.x).toBe(1)
        expect(w.pos.y).toBe(2)
    });
});