const fs = require("fs");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n");
let sum = 0;

input.forEach(input => {
    let counter = 0

    let history = [input.split(' ').map(item => +item)]
    for (; ;) {
        if (!history[counter]?.length) {
            break;
        }
        history.push([])
        history[counter].forEach((item, index) => {
            if (!isNaN(history[counter][index + 1]) && history[counter + 1]) {
                history[counter + 1].push(history[counter][index + 1] - item)
            }
        })
        counter++
        if (history[counter].every(item => item === 0)) {
            break;
        }
    }
    history = history.filter(item => item.length)
    let lastRow = history.length - 1
    let cachedLastResult = 0;
    for (lastRow; lastRow >= 0; lastRow--) {
        const newResult = history[lastRow][0] - cachedLastResult
        cachedLastResult = newResult
        history[lastRow].unshift(newResult)
    }
    const firstRow = history[0][0]
    sum += firstRow
})

console.log(sum)