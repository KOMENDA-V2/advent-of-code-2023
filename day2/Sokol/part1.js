const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14
let sum = 0

for (const line of input.split("\n")) {
    const [game, queue] = line.split(': ')
    const matches = queue.replace('\r', '').split(';')
    let isPossible = true;

    matches.forEach(match => {
        const qubes = match.split(', ')
        qubes.forEach(qube => {
            const [count, color] = qube.trim().split(' ')
            if (color === 'red' && count > RED_CUBES) {
                isPossible = false;
            } else if (color === 'green' && count > GREEN_CUBES) {
                isPossible = false;
            } else if (color === 'blue' && count > BLUE_CUBES) {
                isPossible = false;
            }
        })
    })
    if (isPossible) {
        const gameNumber = game.trim().split(' ')[1]
        console.log(gameNumber)
        sum += +gameNumber
    }
}

console.log(sum)