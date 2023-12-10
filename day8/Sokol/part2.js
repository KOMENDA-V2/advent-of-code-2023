const fs = require("fs");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n");

const directions = input[0].split('')
const map = {}
const data = input.splice(2)
let counter = 0;
data.forEach((item) => {
    const [mark, left, right] = item.match(/\w{3}/g)
    map[mark] = { left, right }
})

const points = Object.keys(map).filter(item => item[2] === 'A')
console.log(points)
let currentDirection = ''
let instructionsCounter = 0

for (; ;) {
    let isAllEndingWithZ = points.every(item => item[2] === 'Z')
    if (isAllEndingWithZ) {
        break;
    }
    currentDirection = directions[instructionsCounter]
    points.forEach((point, pointIndex) => {
        points[pointIndex] = currentDirection === 'L' ? map[point].left : map[point].right
    })
    counter++
    instructionsCounter++
    if (instructionsCounter > directions.length - 1) {
        instructionsCounter = 0;
    }

    if (counter % 100000000 === 0) {
        console.log({ points })
        console.log(counter)
    }
}
console.log(counter)
