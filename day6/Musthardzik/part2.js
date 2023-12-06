const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
const [time, distance] = input.split("\n")
const [name1, value1] = time.split(": ")
const [name2, value2] = distance.split(": ")

  let times = value1.replace("\r", "").trim().replaceAll("     ", "").split("       ")
  let distances = value2.replace("\r", "").trim().replaceAll("   ", "").split("       ").filter(item => item > 0)
  let multi = 1;
    for (let i = 0; i < times.length; i++) {
      let possibilitiesCount = 0
      const timesCount = +times[i]
      console.log(timesCount)
      const distancesCount = +distances[i]
      console.log(distancesCount)
      for (let j = 0; j < timesCount; j++) {
        const timeLeft = timesCount - j;
        const distanceLeft = timeLeft * j;
        if (distanceLeft > distancesCount) {
          possibilitiesCount++
        }
      }
      multi *= possibilitiesCount
    }
    console.log(multi)