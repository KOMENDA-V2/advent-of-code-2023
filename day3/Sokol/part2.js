const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" }).split("\n");

let sum = 0;

input.map(line => line.trim().replace('\r', '')).forEach((line, lineIndex) => {
    for (let index = 0; index < line.length; index++) {
        let array = []
        if (line[index] === '*') {
            const segment = input.map(line => line.trim().replace('\r', '')).slice(lineIndex - 1 < 0 ? lineIndex : lineIndex - 1, lineIndex + 2)
            segment.forEach(item => {
                let text = item[index]
                let shouldBlockLeft = false;
                let shouldBlockRight = false;
                const NUMB = 4
                for (let move = 1; move <= NUMB; move++) {
                    if (!shouldBlockLeft && !isNaN(item[index - move])) {
                        text = `${item[index - move]}${text}`
                    } else {
                        shouldBlockLeft = true;
                    }
                    if (!shouldBlockRight && !isNaN(item[index + move])) {
                        text = `${text}${item[index + move]
                            } `
                    } else {
                        shouldBlockRight = true;
                    }
                }
                array.push(text)
            })
            array = array.map(item => {
                item = item.split('.').map(subItem => subItem.split('*'))
                return item.map(subItem => subItem.map(subSubItem => subSubItem.replaceAll(/[^a-zA-Z0-9 ]/g, '').replaceAll(' ', '')))
            })
            array = array.flat().flat().filter(item => item.length)
            if (array.length > 1) {
                sum += +array[0] * +array[1]
            }
        }
    }
})
console.log(sum)