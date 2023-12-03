const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' })

function findPossibleGames() {
	let sum = 0

	for (const line of data.split('\n')) {
		let maxRed = 0
		let maxGreen = 0
		let maxBlue = 0
		let multiply = 0

		const [game, values] = line.split(': ')
		const sets = values.split('; ').map(set => set.split(', '))

		const final = sets.forEach(set => {
			set.forEach(item => {
				const [count, color] = item.trim().split(' ')
				if (+count > maxRed && color === 'red') {
					maxRed = +count
				} else if (+count > maxGreen && color === 'green') {
					maxGreen = +count
				} else if (+count > maxBlue && color === 'blue') {
					maxBlue = +count
				}
			})
		})
		console.log({game, maxRed, maxGreen, maxBlue})
		multiply = maxRed * maxGreen * maxBlue
		sum += multiply
	}
	console.log(`Sum of the power of sets is: ${sum}`)
}
findPossibleGames()
