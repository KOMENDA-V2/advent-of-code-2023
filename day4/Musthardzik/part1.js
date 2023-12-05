const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
let totalP = 0

for(const line of input.split("\n")) {
    const [game, values] = line.replace("\r", "").split(": ");
    const numbersOnCoupon = values.split("| ")
    let trueNumbersArray = []
        numbersOnCoupon.forEach(realNumber => {
            const realNumbers = realNumber.trim().split(" ").map(e => parseInt(e)).filter(item => item > 0)
            let matches = 0;
            realNumbers.forEach(number => {
                if (trueNumbersArray.includes(number) === true) {
                    matches = matches === 0 ? 1 : matches * 2
                }
            })
            trueNumbersArray.push(...realNumbers)
            totalP += matches
        })
        trueNumbersArray = [];
    }
    console.log(totalP)