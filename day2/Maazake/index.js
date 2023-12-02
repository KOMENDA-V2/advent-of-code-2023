const fs = require("fs");

const data = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });



function findPossibleGames() {
	const red = 12
	const green = 13
	const blue = 14
	let sum = 0

	for (const line of data.split("\n")) {
		let isPossible = true
		const [game, values] = line.split(': ')
		const sets = values.split('; ').map(set => set.split(', '))

		const final = sets.forEach(set => {
			set.forEach(item => {
				const [count, color] = item.split(' ')
				if (
					(count > red && color === 'red') ||
					(count > green && color === 'green') ||
					(count > blue && color === 'blue')
				) {
					isPossible = false
				}
			})
		})

		if (isPossible) {
			sum += +game.split(' ')[1] 
		}
	}
	console.log(sum);
}

findPossibleGames()
