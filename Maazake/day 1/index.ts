import * as fs from 'fs';

function getDigits(puzzleInputs: any[]) {
	let values: number[] = []

	for (const line of puzzleInputs) {
		const firstDigit = line.match(/\d/)[0]
		const lastDigit = line.match(/\d(?=\D*$)/)[0]
		const connectedDigits = parseInt(firstDigit + lastDigit)
		values.push(connectedDigits)
	}

	return values
}

const sumUp = (connectedDigits: number[]) => connectedDigits.reduce((first, second) => first + second, 0)

const fileContent = fs.readFileSync('input.txt', 'utf-8')
const puzzleInputs = fileContent.split('\n')
const nonEmptyInputs = puzzleInputs.filter(Boolean)

const twoDigits = getDigits(nonEmptyInputs)
const summed = sumUp(twoDigits)

console.log(`Sum of all of the calibration values is: ${summed}`)
