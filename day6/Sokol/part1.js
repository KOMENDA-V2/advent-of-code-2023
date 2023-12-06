const fs = require("fs");

const [timeLine, distanceLine] = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" }).split("\n");

const times = timeLine.split(':')[1].replace('\r', '').split(' ').filter(item => item.length)
const distances = distanceLine.split(':')[1].replace('\r', '').split(' ').filter(item => item.length)

const ways = []

times.forEach((time, timeIndex) => {
    let wins = 0
    for (let i = 0; i <= +time; i++) {
        const raceTime = +time - i
        const distance = raceTime * i
        const record = distances[timeIndex]
        if (distance > record) {
            wins++
        }
    }
    ways.push(wins)
})
console.log(ways.reduce((acc, cur) => acc * cur))