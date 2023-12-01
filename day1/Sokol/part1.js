const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
let sum = 0

for (const line of input.split("\n")) {
    const chars = [...line.replaceAll(/\s/g, '')]
        .map(item => +item)
        .filter(item => !isNaN(item))
    const number = +`${chars[0]}${chars[chars.length - 1]}`
    sum += number
}

console.log(sum)