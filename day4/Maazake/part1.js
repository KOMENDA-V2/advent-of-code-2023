const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' }).split('\n')

let totalPoints = 0

for (const card of data) {
	let points = 0

	const [winningNumbers, yourNumbers] = card.split(' | ')
	const allWinningNumbers = winningNumbers
		.split(' ')
		.map(Number)
		.filter(item => item > 0)
	const allYourNumbers = yourNumbers
		.split(' ')
		.map(Number)
		.filter(item => item > 0)

	for (let number of allYourNumbers) {
		if (allWinningNumbers.includes(number)) {
			points = points === 0 ? 1 : points * 2
		}
	}

	totalPoints += points
}
console.log(totalPoints)
