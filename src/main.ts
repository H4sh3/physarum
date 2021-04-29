import { State } from "./state";

const WIDTH = 150;
const HEIGHT = 150;
const bs: number = 5;

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = WIDTH * bs;
canvas.height = HEIGHT * bs;
const context: CanvasRenderingContext2D = canvas.getContext("2d");

const populationSize = Math.floor((WIDTH * HEIGHT) * 0.15) // 15%

const state = new State(WIDTH, HEIGHT, populationSize)
state.init()

function loop(timestamp) {
    const progress = timestamp - lastRender
    state.step()
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)

function draw() {
    background()
    drawField(state.fieldWrapper.getField())
    // drawWalkers(state.walkers)
}

function background() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, state.size.w * bs, state.size.h * bs);
}

function drawWalkers(walkers) {
    walkers.forEach(walker => {
        context.fillStyle = "#FF0000";
        context.fillRect(walker.pos.x * bs, walker.pos.y * bs, bs, bs);
    })
}

function drawField(field) {
    const factor = (255 / state.fieldWrapper.max)
    field.forEach((row, x) => {
        row.forEach((cell, y) => {
            context.fillStyle = `rgb(0,0,${factor * cell})`;
            context.fillRect(x * bs, y * bs, bs, bs);
        })
    })
}