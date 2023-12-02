import * as fs from 'fs'

function getDigits(puzzleInputs: any[]) {
	let values: number[] = []

	for (let i = 0; i < nonEmptyInputs.length; i++) {
		const fixedValues = nonEmptyInputs[i]
			.replaceAll('one', 'on1e')
			.replaceAll('two', 'tw2o')
			.replaceAll('three', 'thr3ee')
			.replaceAll('four', 'fo4ur')
			.replaceAll('five', 'fi5ve')
			.replaceAll('six', 'si6x')
			.replaceAll('seven', 'sev7en')
			.replaceAll('eight', 'eig8ht')
			.replaceAll('nine', 'ni9ne')

		const firstDigit = (fixedValues.match(/\d/) ?? [])[0] ?? '0'
		const lastDigit = (fixedValues.match(/\d(?=\D*$)/) ?? [])[0] ?? '0'
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
