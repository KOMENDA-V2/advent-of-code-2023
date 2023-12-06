const fs = require("fs");

const [timeLine, distanceLine] = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" }).split("\n");

const globalTime = +timeLine.split(':')[1].replace('\r', '').replaceAll(' ', '')
const record = +distanceLine.split(':')[1].replace('\r', '').replaceAll(' ', '')

let wins = 0
for (let i = 0; i <= globalTime; i++) {
    const raceTime = globalTime - i
    const distance = raceTime * i
    if (distance > record) {
        wins++
    }
}
console.log(wins)