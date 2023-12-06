const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" }).split("\n");
let lines = Array.from({ length: input.length }).map(_ => [])
let counter = 0;
input
    .map(line => line.trim().replace('\r', ''))
    .forEach((rawLine, lineIndex) => {
        if (!rawLine.length) {
            counter++
            return
        }
        lines[counter].push(rawLine)
    })

lines = lines.map(seed => seed.slice(1)).filter(i => i.length)
lines = lines.map(line => line.map(item => item.split(' ')))

const maps = []

for (let i = 1; i < lines.length; i++) {
    let map = []
    lines[i].forEach(seeds => {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = seeds
        map.push({
            destination: {
                start: +destinationRangeStart,
                end: +destinationRangeStart + +rangeLength,
                length: +rangeLength
            },
            source: {
                start: +sourceRangeStart,
                end: +sourceRangeStart + +rangeLength,
                length: +rangeLength
            }
        })
    })
    maps.push(map)
}

const packs = []
lines[0].forEach(line => {
    line.forEach(seed => {
        const seedInfo = [+seed]
        maps.forEach((map, index) => {

            const location = map.find(map => map.source.start <= +seedInfo[index] && map.source.end >= +seedInfo[index])
            if (location) {
                const shift = location.destination.start + +seedInfo[index] - location.source.start
                seedInfo.push(shift)
            } else {
                seedInfo.push(+seedInfo[index])
            }
        })
        packs.push({ seed: seedInfo[0], location: seedInfo[seedInfo.length - 1] })
    })
})
console.log(packs.sort((a, b) => a.location - b.location)[0])
