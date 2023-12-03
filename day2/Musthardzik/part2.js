const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
let sum = 0;

for(const line of input.split("\n")) {
    const [gameplay, values] = line.replace("\r", "").split(": ");
    const games = values.split(";");
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    games.forEach(game => {
        const cube = game.split(", ")
        cube.forEach(item => {
            const [value, colorName] = item.trim().split(" ")
            if(colorName === "red" && +value > maxRed) {
                maxRed = +value;
            } else if (colorName === "blue" && +value > maxBlue) {
                maxBlue = +value;
            } else if (colorName === "green" && +value > maxGreen) {
                maxGreen = +value;
            }
        })
    })
    sum += maxGreen * maxRed * maxBlue
}
console.log(sum)