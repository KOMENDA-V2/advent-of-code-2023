const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
let sum = 0

for (const line of input.split("\n")) {
    const charString = [...line.replaceAll(/\s/g, '')]
    const indexes = []
    numbers.forEach(number => {
        const deepCopy = line
        const regex = new RegExp(number, "g");
        while ((result = regex.exec(deepCopy))) {
            indexes.push({
                index: result.index,
                value: numbers.indexOf(number) + 1
            })
        }
    })
    const firstDigit = {
        index: charString.findIndex(item => !isNaN(+item)),
        value: +charString[charString.findIndex(item => !isNaN(+item))]
    }
    const lastDigitIndex = charString.reverse().findIndex(item => !isNaN(+item))

    const lastDigit = {
        index: charString.length - 1 - lastDigitIndex,
        value: +charString[lastDigitIndex]
    }

    indexes.push(...[firstDigit, lastDigit])

    const sortedIndexes = indexes.sort((a, b) => a.index - b.index)
    const number = +`${sortedIndexes[0].value}${sortedIndexes[sortedIndexes.length - 1].value}`
    sum += number
}

console.log(sum)