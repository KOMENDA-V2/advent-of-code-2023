const fs = require("fs");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n")
    .map(item => item.split(''));

const possibleMoves = {
    'N': ["|", '7', 'F'],
    'S': ["|", 'J', 'L'],
    'W': ["-", 'F', 'L'],
    'E': ["-", '7', 'J'],
}

const movesMap = {
    "|": { 'N': { row: 2, col: 0 }, 'S': { row: -2, col: 0 } },
    "-": { 'W': { row: 0, col: 2 }, 'E': { row: 0, col: -2 } },
    "L": { 'N': { row: 1, col: 1 }, 'E': { row: -1, col: -1 } },
    "J": { 'N': { row: 1, col: -1 }, 'W': { row: -1, col: 1 } },
    "7": { 'S': { row: -1, col: -1 }, 'W': { row: 1, col: 1 } },
    "F": { 'S': { row: -1, col: 1 }, 'E': { row: 1, col: -1 } },
    "S": { 'N': {}, 'S': {}, 'W': {}, 'E': {} }
}

let currentPoint = { row: 0, col: 0 }
const previousOne = []
input.forEach((item, row) => {
    const col = item.indexOf('S')
    if (col >= 0) {
        currentPoint = { row, col }
    }
})

let counter = 0;
for (; ;) {
    const { row, col } = currentPoint
    const main = input[row][col];
    const west = input[row]?.[col - 1] ?? '.'
    const east = input[row]?.[col + 1] ?? '.'
    const north = input[row - 1]?.[col] ?? '.'
    const south = input[row + 1]?.[col] ?? '.'
    let moves = []

    if (possibleMoves['N'].includes(north) && Object.keys(movesMap[main]).filter(item => item === 'N').length > 0) {
        moves.push({ value: north, dir: 'S' })
    }

    if (possibleMoves['S'].includes(south) && Object.keys(movesMap[main]).filter(item => item === 'S').length > 0) {
        moves.push({ value: south, dir: 'N' })
    }

    if (possibleMoves['W'].includes(west) && Object.keys(movesMap[main]).filter(item => item === 'W').length > 0) {
        moves.push({ value: west, dir: 'E' })
    }

    if (possibleMoves['E'].includes(east) && Object.keys(movesMap[main]).filter(item => item === 'E').length > 0) {
        moves.push({ value: east, dir: 'W' })
    }
    const filteredPoints = []
    moves.forEach(item => {
        const ory = movesMap[item.value][item.dir]
        const newOne = [+ory.row + +currentPoint.row, +ory.col + +currentPoint.col]
        if (newOne[0] !== previousOne[0] || newOne[1] !== previousOne[1]) {
            filteredPoints.push(newOne)
            previousOne[0] = currentPoint.row
            previousOne[1] = currentPoint.col
        }
    })

    currentPoint = { row: filteredPoints[0][0], col: filteredPoints[0][1] }

    counter++
    if (input[currentPoint.row][currentPoint.col] === 'S') {
        break;
    }
}

console.log(counter);
