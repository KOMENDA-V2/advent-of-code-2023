const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" }).split("\n");

let sum = 0;

input.map(line => line.trim().replace('\r', ''))
    .forEach((rawLine, lineIndex) => {
        const indexCount = rawLine.indexOf(':')
        let points = 0
        const line = rawLine.slice(indexCount + 2)
        const [winningNumbers, myNumbers] = line.split(' | ')
        myNumbers
            .split(' ')
            .filter(number => number.length)
            .forEach(number => {
                if (winningNumbers.split(' ').includes(number)) {
                    points = points === 0 ? 1 : points * 2
                }
            })
        sum += points
    })

console.log(sum)

