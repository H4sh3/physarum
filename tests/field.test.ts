import { diffuse } from '../src/fieldWrapper'

const f = [
    [0,0,0,0,0],
    [0,9,9,9,0],
    [0,9,9,9,0],
    [0,9,9,9,0],
    [0,0,0,0,0],
]

describe('field functions', function () {
    it('should diffuse correctly', function () {
        const out = diffuse(f)
        const out2 = diffuse(out)
    });
})