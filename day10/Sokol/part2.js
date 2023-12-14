const fs = require("fs");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n")
    .map(item => item.split(''));

function groupConsecutiveNumbers(numbers) {
    const result = [];
    let startRange = numbers[0];

    for (let i = 1; i <= numbers.length; i++) {
        // Check if the current number is not consecutive or it's the last number
        if (numbers[i] !== numbers[i - 1] + 1 || i === numbers.length) {
            // If only one number, add it as a single element, otherwise add the range
            if (startRange === numbers[i - 1]) {
                result.push([startRange]);
            } else {
                if (numbers[i - 1] - startRange === 1) {
                    result.push([startRange], [numbers[i - 1]]);
                } else
                    result.push([startRange, numbers[i - 1]]);
            }

            // Update the start of the new range
            startRange = numbers[i];
        }
    }

    return result;
}

const possibleMoves = {
    'N': ["|", '7', 'F'],
    'S': ["|", 'J', 'L'],
    'W': ["-", 'F', 'L'],
    'E': ["-", '7', 'J'],
}

const movesMap = {
    "|": { 'N': { row: 1, col: 0 }, 'S': { row: -1, col: 0 } },
    "-": { 'W': { row: 0, col: 1 }, 'E': { row: 0, col: -1 } },
    "L": { 'N': { row: 1, col: 0 }, 'E': { row: 0, col: -1 } },
    "J": { 'N': { row: 1, col: 0 }, 'W': { row: 0, col: 1 } },
    "7": { 'S': { row: -1, col: 0 }, 'W': { row: 0, col: 1 } },
    "F": { 'S': { row: -1, col: 0 }, 'E': { row: 0, col: -1 } },
    "S": { 'N': {}, 'S': {}, 'W': {}, 'E': {} }
}

const test = []

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
    test.push(currentPoint)
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

    if (filteredPoints.length === 0) {
        break;
    }
    currentPoint = { row: filteredPoints[0][0], col: filteredPoints[0][1] }

    counter++
    if (input[currentPoint.row][currentPoint.col] === 'S') {
        break;
    }
}

// console.log((counter + 1) / 2)

const test2 = test.reduce((result, currentItem) => {
    const groupKey = currentItem['row'];
    if (!result[groupKey]) {
        result[groupKey] = [];
    }
    result[groupKey].push(currentItem);
    return result;
}, {});
let rowMax = 0;
let colMax = 0
Object.keys(test2).forEach(item => {
    const test4 = test2[item].sort((a, b) => a.col - b.col)
    test2[item] = test4
    if (test4[test4.length - 1].col > colMax) {
        colMax = test4[test4.length - 1].col
    }
})
const asd = Object.keys(test2)
rowMax = test2[asd[asd.length - 1]][0].row

const map123 = Array.from({ length: rowMax + 1 }).map(_ => Array.from({ length: colMax + 1 }).map(item => '.'))
const mapdupa = []
// console.log(map123)
Object.keys(test2).forEach(item => {
    const row = test2[item].map(item => item.col)
    // console.log(row)
    const dupa = groupConsecutiveNumbers(row)
    mapdupa.push(dupa)
})
// console.log(`${map123[0]}\n${map123[1]}\n${map123[2]}\n${map123[3]}\n${map123[4]}\n${map123[5]}\n${map123[6]}\n${map123[7]}\n`)

const ghsdf = mapdupa.filter(i => i.length > 1)
let pointer = 0
console.log(ghsdf)
ghsdf.forEach(item => {
    for (let i = 0; i < item.length; i++) {
        if (item[i].length === 2) {
            let [f1, f2] = item[i]
            let asdas = f2 - f1 - 1
            if (asdas % 2 != 0) {
             item.splice(i, 0 )   
            }
        }
        // let test = 0

        // let f1 = item[i]
        // let f2 = item[i + 1]
        // let f3 = item[i - 1]
        // console.log(f1, f2)

        // if (!f2 && f3.length === 2) {
        //     test = f1[0] - f3[1] - 1
        // } else if (f1.length === 1 && f2?.length === 1) {
        //     test = f2[0] - f1[0] - 1
        // } else if (f1.length === 1 && f2?.length === 2) {
        //     test = f2[1] - f1[0] - 1
        // } else {
        //     console.log('not handled', f1, f2, f3)
        // }

        // if (f1.length === 2 && f2?.length === 1) {

        // }
        // else {
        //     i++
        // }
        // console.log(test)
        // pointer += test

    }
})

console.log(pointer)

