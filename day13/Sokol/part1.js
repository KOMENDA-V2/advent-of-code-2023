const fs = require("fs");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n\n")
    .map(item => item.split("\n"))

function reverseRowsWithCols(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Initialize a new matrix with swapped dimensions
    const reversedMatrix = new Array(numCols).fill(null).map(() => new Array(numRows));

    // Iterate through the original matrix and swap rows with columns
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            reversedMatrix[j][i] = matrix[i][j];
        }
    }

    return reversedMatrix;
}
let sum = 0
let cols = 0
let rows = 0
input.forEach((item, index) => {
    let test2 = 0
    if (index % 2 !== 0) {
        console.log('rows')
        console.log(item)

        for (let i = 0; i < item.length; i++) {
            const test = item.findIndex((el, elIndex) => el === item[i] && elIndex !== i)
            if (test === -1) {
                test2++
            } else {
                test2 = Math.ceil((test + 1) / 2)
                break;
            }
        }
        rows = test2
        console.log(test2)
        sum += cols + rows * 100
    } else {
        console.log('cols')
        console.log(item)
        const a = item.map(i => i.split(''))
        let test3 = reverseRowsWithCols(a)
        test3 = test3.map(i => i.join(''))
        for (let i = 0; i < test3.length; i++) {
            const test = test3.findIndex((el, elIndex) => el === test3[i] && elIndex !== i)
            if (test === -1) {
                test2++
            } else {
                test2 = Math.ceil((test + 1) / 2)
                break;
            }
        }
        cols = test2
        console.log(test2)
    }
})

console.log(cols, rows, sum)
