const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" }).split("\n");

const data = input.map(line => line.trim().replace('\r', ''))
let cards = Array.from({ length: data.length }).map(_ => 0)
data.map(line => line.trim().replace('\r', ''))
    .forEach((rawLine, lineIndex) => {
        const indexCount = rawLine.indexOf(':')
        let matchedNumbersCount = 0
        const line = rawLine.slice(indexCount + 2)
        const [winningNumbers, myNumbers] = line.split(' | ')

        myNumbers
            .split(' ')
            .filter(number => number.length)
            .forEach(number => {
                if (winningNumbers.split(' ').includes(number)) {
                    matchedNumbersCount++
                }
            })
        cards[lineIndex] += 1

        if (matchedNumbersCount > 0) {
            const size = cards[lineIndex]
            for (let i = 0; i < matchedNumbersCount; i++) {
                cards[lineIndex + i + 1] += +size
            }
        }
    })
const sum = cards
    .filter(item => !isNaN(+item))
    .reduce((acc, cur) => acc += cur)

console.log(sum)