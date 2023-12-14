const fs = require("fs");
const { FibonacciHeap } = require("@tyriar/fibonacci-heap");

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

function getNeighbors(map, i, j) {
    return [
        i > 0 && [i - 1, j],
        i < map.length - 1 && [i + 1, j],
        j > 0 && [i, j - 1],
        j < map[i].length - 1 && [i, j + 1],
    ].filter(Boolean);
}

function dijkstra(map, startI, startJ, hiWeight) {
    const distance = map.map((x) => x.map((_) => Number.POSITIVE_INFINITY));
    distance[startI][startJ] = 0;
    const queue = new FibonacciHeap();
    const queueNodes = map.map((x) => x.map((_) => null));
    for (let i = 0; i < queueNodes.length; i++) {
        for (let j = 0; j < queueNodes[i].length; j++) {
            queueNodes[i][j] = queue.insert(distance[i][j], [i, j]);
        }
    }
    while (!queue.isEmpty()) {
        const [i, j] = queue.extractMinimum().value;
        for (const [nI, nJ] of getNeighbors(map, i, j)) {
            const weight = map[nI][nJ] === "X" ? hiWeight - 1 : 1;
            const newDistance = distance[i][j] + weight;
            if (distance[nI][nJ] > newDistance) {
                distance[nI][nJ] = newDistance;
                queue.decreaseKey(queueNodes[nI][nJ], newDistance);
            }
        }
    }
    return {
        distance,
    };
}

let sum = 0;
for (let i = 0; i < galaxies.length - 1; i++) {
    const [startI, startJ] = galaxies[i];
    const { distance } = dijkstra(input, startI, startJ, 1_000_000);
    for (let j = i + 1; j < galaxies.length; j++) {
        const [x, y] = galaxies[j];
        sum += distance[x][y];
    }
}
console.log(sum)

