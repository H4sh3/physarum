
export type Field = number[][];

export class FieldWrapper {
    public field: Field
    private w: number;
    private h: number;
    public max: number;

    constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
        this.field = this.getEmptyField(w, h);
        this.max = 0;
    }

    private getEmptyField(w: number, h: number): Field {
        const newField: Field = [];
        for (let y = 0; y < h; y++) {
            const row: number[] = [];
            for (let x = 0; x < w; x++) {
                row.push(0)
            }
            newField.push(row)
        }
        return newField;
    }

    public get(x, y) {
        if (x > this.w - 1) {
            x -= this.w -1
        }

        if (x < 0) {
            x = this.w + x
        }

        if (y > this.h - 1) {
            y -= this.h -1
        }

        if (y < 0) {
            y = this.h + y
        }

        return this.field[x][y]
    }

    public increase(x, y) {
        if (this.field[x] !== undefined && this.field[x][y] !== undefined) {
            this.field[x][y] = 5
        }
    }


    public weaken() {
        let tmpMax = 0
        for (let x = 0; x < this.field.length; x++) {
            for (let y = 0; y < this.field[x].length; y++) {
                this.field[x][y] *= 0.95

                // update max in same iteration
                tmpMax = this.field[x][y] > tmpMax ? this.field[x][y] : tmpMax;
            }
        }
        this.max = tmpMax;
    }



    public getField() {
        return this.field;
    }
}

export function diffuse(field: Field) {
    const fieldCopy = JSON.parse(JSON.stringify(field));

    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
                let sum = 0
                for (let n = -1; n <= 1; n++) {
                    for (let m = -1; m <= 1; m++) {
                        if (field[x + n] !== undefined && field[x + n][y + m] !== undefined) {
                            sum += field[x + n][y + m]
                        }
                    }
                }

                fieldCopy[x][y] = sum / 9
        }
    }
    return fieldCopy
}