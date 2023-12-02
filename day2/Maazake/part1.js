const fs = require('fs')

// const data = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });

let data = [
	'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
	'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
	'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
	'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
	'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
]

function findPossibleGames() {
	const red = 12
	const green = 13
	const blue = 14
	let sum = 0

	for (const line of data.split('\n')) {
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
	console.log(sum)
}

findPossibleGames()
