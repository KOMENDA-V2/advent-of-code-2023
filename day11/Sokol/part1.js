const fs = require("fs");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n")
    .map(item => item.split(''))

function expand(map) {
    const rowsToExpand = [];
    const columnsToExpand = [];
    // rows
    for (let i = 0; i < map.length; i++) {
        let canExpand = true;
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "#") {
                canExpand = false;
                break;
            }
        }
        if (canExpand) {
            rowsToExpand.push(i);
        }
    }
    // columns
    for (let j = 0; j < map[0].length; j++) {
        let canExpand = true;
        for (let i = 0; i < map.length; i++) {
            if (map[i][j] === "#") {
                canExpand = false;
                break;
            }
        }
        if (canExpand) {
            columnsToExpand.push(j);
        }
    }
    // expanding columns
    for (let k = columnsToExpand.length - 1; k >= 0; k--) {
        for (let i = 0; i < map.length; i++) {
            map[i].splice(columnsToExpand[k], 0, "X");
        }
    }
    // expanding rows
    const emptyRow = "X".repeat(map[0].length).split("");
    for (let k = rowsToExpand.length - 1; k >= 0; k--) {
        map.splice(rowsToExpand[k], 0, [...emptyRow]);
    }
}

expand(input)

const galaxies = []
input.forEach((item, index) => {
    item.forEach((subItem, subIndex) => {
        if (subItem === '#') {
            galaxies.push([index, subIndex])
        }
    })
})

function calculateManhattanDistance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

function calculateAllManhattanDistances(points) {
    const distances = [];
    const n = points.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            const distance = calculateManhattanDistance(points[i], points[j]);
            distances.push({
                points: [i, j],
                distance: distance
            });
        }
    }

    return distances;
}

const allManhattanDistances = calculateAllManhattanDistances(galaxies);

console.log(allManhattanDistances.reduce((sum, { distance }) => sum + distance, 0));