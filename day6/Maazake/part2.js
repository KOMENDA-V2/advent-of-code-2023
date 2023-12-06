const fs = require('fs')

const input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' })

const [heldTimes, madeDistances] = input.split('\n')

const time = heldTimes
	.replaceAll('\r', '')
	.split(': ')[1]
	.split(' ')
	.filter(num => num)
	.map(Number)
	.join('')
const distance = madeDistances
	.replaceAll('\r', '')
	.split(': ')[1]
	.split(' ')
	.filter(num => num)
	.map(Number)
	.join('')

let totalWaysToBeatTheRecord = 0

for (let holdTime = 0; holdTime <= time; holdTime++) {
	const remainingTime = time - holdTime
	const raceTime = remainingTime * holdTime

	if (raceTime > distance) {
		totalWaysToBeatTheRecord++
	}
}

console.log(totalWaysToBeatTheRecord)
