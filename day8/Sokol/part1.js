const fs = require("fs");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n");

const directions = input[0].split('')
let START = 'AAA'
let END = 'ZZZ'
const map = {}
const data = input.splice(2)
let counter = 0;
data.forEach((item) => {
    const [mark, left, right] = item.match(/\w{3}/g)
    map[mark] = { left, right }
})
let currentDirection = ''
let instructionsCounter = 0

while (START !== END) {
    currentDirection = directions[instructionsCounter]
    START = currentDirection === 'L' ? map[START].left : map[START].right
    counter++
    instructionsCounter++
    if (instructionsCounter > directions.length - 1) {
        instructionsCounter = 0;
    }
}

console.log(counter)
