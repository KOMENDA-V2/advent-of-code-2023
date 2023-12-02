const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
let sum = 0

for (const line of input.split("\n")) {
    const matches = line.split(': ')[1].replace('\r', '').split(';')

    const redQubes = [];
    const greenQubes = [];
    const blueQubes = []
    matches.forEach(match => {
        const qubes = match.split(', ')
        qubes.forEach(qube => {
            const [count, color] = qube.trim().split(' ')
            if (color === 'red') {
                redQubes.push(count)
            } else if (color === 'green') {
                greenQubes.push(count)
            } else if (color === 'blue') {
                blueQubes.push(count)
            }
        })
    })
    const redMin = redQubes.sort((a, b) => b - a)[0]
    const greenMin = greenQubes.sort((a, b) => b - a)[0]
    const blueMin = blueQubes.sort((a, b) => b - a)[0]

    const sumOfQubes = redMin * greenMin * blueMin
    sum += sumOfQubes
}

console.log(sum)