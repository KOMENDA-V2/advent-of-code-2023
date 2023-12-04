const fs = require('fs')

const input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' }).split('\n')

const symbols = ['#', '$', '%', '^', '&', '*', '/', '=', '@', '+', '-']
let numbers = []
let sum = 0
input.forEach((row, column) => {
	;[...row].forEach((char, charIndex) => {
		const isSymbol = symbols.includes(char)
		if (isSymbol) {
			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					let collector = ''

					if (!isNaN(+input[column + i][charIndex + j])) {
						collector += input[column + i][charIndex + j]

						if (!isNaN(+input[column + i][charIndex + j - 1])) {
							collector = `${input[column + i][charIndex + j - 1]}${collector}`

							if (!isNaN(+input[column + i][charIndex + j - 2])) {
								collector = `${input[column + i][charIndex + j - 2]}${collector}`
							}
						}

						if (!isNaN(+input[column + i][charIndex + j + 1])) {
							collector += input[column + i][charIndex + j + 1]

							if (!isNaN(+input[column + i][charIndex + j + 2])) {
								collector += input[column + i][charIndex + j + 2]
							}
						}
					}

					if (collector.length) {
						numbers.push(collector)
					}
				}
			}
		}
	})
})

numbers.forEach((item, index) => {
	if (numbers[index - 1] !== item) {
		sum += +item
	}
})

console.log(sum)
