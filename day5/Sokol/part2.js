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
const numbersRange = []
lines[0].forEach((line, index) => {
    for (let i = 0; i < line.length; i++) {
        test.push({ start: line[i], length: line[i + 1] })
        i++
    }
})

const packs = []
numbersRange.forEach((item, indextest) => {
    console.log(`####### - ${indextest} - ########`)
    const length = +item.start + +item.length
    for (let i = item.start; i < length; i++) {
        const seedInfo = [+i]
        maps.forEach((map, index) => {
            const location = map.find(map => map.source.start <= +seedInfo[index] && map.source.end >= +seedInfo[index])
            if (location) {
                const shift = location.destination.start + +seedInfo[index] - location.source.start
                seedInfo.push(shift)
            } else {
                seedInfo.push(+seedInfo[index])
            }
        })

        if (packs[0] && packs[0].location > seedInfo[seedInfo.length - 1]) {
            packs[0].seed = seedInfo[0]
            packs[0].location = seedInfo[seedInfo.length - 1]
        } else if (!packs[0]) {
            packs.push({ seed: seedInfo[0], location: seedInfo[seedInfo.length - 1] })
        }
    }
    console.log(packs)
})
console.log(packs.location - 1)