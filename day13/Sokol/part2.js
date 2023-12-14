const fs = require("fs");
const { FibonacciHeap } = require("@tyriar/fibonacci-heap");

const input = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .replaceAll('\r', '')
    .split("\n")
    .map(item => item.split(''))
