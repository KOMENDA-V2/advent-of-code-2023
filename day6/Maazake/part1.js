const fs = require('fs')

const input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' })

const [heldTimes, madeDistances] = input.split('\n')

const times = heldTimes
	.replaceAll('\r', '')
	.split(': ')[1]
	.split(' ')
	.filter(num => num)
	.map(Number)
const distances = madeDistances
	.replaceAll('\r', '')
	.split(': ')[1]
	.split(' ')
	.filter(num => num)
	.map(Number)

let totalWaysToBeatTheRecord = []

times.forEach((time, timeIndex) => {
	let records = 0

	for (let holdTime = 0; holdTime <= time; holdTime++) {
		const remainingTime = time - holdTime
		const raceTime = remainingTime * holdTime
		const newRecord = distances[timeIndex]

		if (raceTime > newRecord) {
			records++
		}
	}
	totalWaysToBeatTheRecord.push(records)
})

console.log(totalWaysToBeatTheRecord.reduce((product, currentNumber) => product * currentNumber))
