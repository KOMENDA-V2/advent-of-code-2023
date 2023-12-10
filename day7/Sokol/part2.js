const fs = require("fs");

const realData = fs
    .readFileSync("./data.txt", { encoding: "utf-8" })
    .split("\n");

const cardOrder = "AKQT98765432J";
const classify = (hand) => {
    let counts = {};
    cardOrder.split("").forEach((card) => (counts[card] = 0));

    for (let card of hand) {
        counts[card]++;
    }

    let bestHand = evaluate(counts);

    if (counts["J"] > 0) {
        for (let card of cardOrder.replace("J", "")) {
            let modifiedCounts = { ...counts };
            modifiedCounts[card] += modifiedCounts["J"];
            modifiedCounts["J"] = 0;
            let handType = evaluate(modifiedCounts);
            bestHand = Math.max(bestHand, handType);
        }
    }

    return bestHand;
};

const evaluate = (counts) => {
    let frequencies = Object.values(counts)
        .filter((count) => count > 0)
        .sort((a, b) => b - a);
    if (frequencies[0] === 5) return 7;
    if (frequencies[0] === 4) return 6;
    if (frequencies[0] === 3 && frequencies[1] === 2) return 5;
    if (frequencies[0] === 3) return 4;
    if (frequencies[0] === 2 && frequencies[1] === 2) return 3;
    if (frequencies[0] === 2) return 2;
    return 1;
};

const compare = (hand1, hand2) => {
    for (let i = 0; i < 5; i++) {
        let diff = cardOrder.indexOf(hand1[i]) - cardOrder.indexOf(hand2[i]);
        if (diff !== 0) return diff;
    }
    return 0;
};

const hands = realData.map((line) => {
    const [hand, bid] = line.split(" ");
    return { hand, bid: parseInt(bid), type: classify(hand) };
});

hands.sort((a, b) => b.type - a.type || compare(a.hand, b.hand));

let result = 0;
hands.forEach((hand, index) => {
    result += hand.bid * (hands.length - index);
});

console.log(result);