const fs = require("fs");

const realData = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .split("\n");

const classify = (hand) => {
    const counts = {};
    hand.split("").forEach((card) => {
        counts[card] = (counts[card] || 0) + 1;
    });

    const frequencies = Object.values(counts).sort((a, b) => b - a);
    if (frequencies[0] === 5) return 7; // 5
    if (frequencies[0] === 4) return 6; // 4
    if (frequencies[0] === 3 && frequencies[1] === 2) return 5; // full
    if (frequencies[0] === 3) return 4; // 3
    if (frequencies[0] === 2 && frequencies[1] === 2) return 3; // 2x2
    if (frequencies[0] === 2) return 2; // 2
    return 1; // 1
};

const compare = (hand1, hand2) => {
    const order = "AKQJT98765432";
    for (let i = 0; i < hand1.length; i++) {
        if (hand1[i] !== hand2[i]) {
            return order.indexOf(hand1[i]) - order.indexOf(hand2[i]);
        }
    }
    return 0;
};

const hands = realData.map((x) => {
    const [hand, bid] = x.split(" ");
    return { hand, bid: parseInt(bid), type: classify(hand) };
});

hands.sort((a, b) => b.type - a.type || compare(a.hand, b.hand));

let result = 0;
hands.forEach((hand, index) => {
    result += hand.bid * (hands.length - index);
});

console.log(result);
