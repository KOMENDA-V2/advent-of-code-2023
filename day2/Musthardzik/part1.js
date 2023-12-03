const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });

const RED_CUBES_COUNT = 12;
const BLUE_CUBES_COUNT = 14;
const GREEN_CUBES_COUNT = 13;
let sum = 0;

for(const line of input.split("\n")) {
    const [gameplay, values] = line.replace("\r", "").split(": ");
    const games = values.split(";");
    let isPossible = true;

    games.forEach(game => {
        const cube = game.split(", ")
        cube.forEach(item => {
            const [value, colorName] = item.trim().split(" ")
            if(colorName === "red" && +value > RED_CUBES_COUNT) {
                isPossible = false;
            } else if (colorName === "blue" && +value > BLUE_CUBES_COUNT) {
                isPossible = false;
            } else if (colorName === "green" && +value > GREEN_CUBES_COUNT) {
                isPossible = false;
            }
        })
    })
    if (isPossible) {
        sum += +gameplay.split(" ")[1]
    }
}
console.log(sum)