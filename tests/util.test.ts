import { random } from '../lib/util';

describe('calculate', function () {
    it('add', function () {
        for (let i = 0; i < 100; i++) {
            const r1: number = random(5)
            expect(r1 >= 0 && r1 <= 5).toBeTruthy()
        }
    });
});