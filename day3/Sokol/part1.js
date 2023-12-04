const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" }).split("\n");

let sum = 0;

input.map(line => line.trim().replace('\r', '')).forEach((line, lineIndex) => {
    for (let index = 0; index < line.length; index++) {

        let numb = ''
        let shouldSkip = 0
        if (!isNaN(+line[index])) {
            numb += line[index]
            if (!isNaN(+line[index + 1])) {
                numb += line[index + 1]
                shouldSkip = 1
                if (!isNaN(+line[index + 2])) {
                    numb += line[index + 2]
                    shouldSkip = 2
                }
            }
        }

        if (numb.length) {
            index += shouldSkip
            let left = index - shouldSkip
            let right = index + shouldSkip + (shouldSkip === 1 ? 1 : 0)
            let top = lineIndex - 1
            let bottom = lineIndex + 1 + 1
            const segment = input.map(line => line.replace('\r', '')).slice(top < 0 ? 0 : top, bottom)
            const smaller = segment.map(line => line.slice(left - 1 < 0 ? 0 : left - 1, right === left ? right + 2 : right))
                .join('').replaceAll('.', '')

            if (isNaN(+smaller[0]) || isNaN(+smaller[smaller.length - 1])) {
                sum += +numb
            }
        }
    }
})

console.log(sum)

