const fs = require('fs')

const input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' }).split('\n')

let test = Array.from({ length: input.length }).map(_ => [])
const gear = '*'
let sum = 0

input.forEach((row, column) => {
	;[...row].forEach((char, charIndex) => {
		const isSymbol = gear.includes(char)
		let dupa = []
		if (isSymbol) {
			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					let collector = ''
					if (input[column + i]) {
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
					}
					if (collector.length) {
						if (test[column]) {
							test[column].push(collector)
							dupa.push(collector)
						}
					}
				}
			}
		}
		if (dupa.length) {
			let dupa2 = dupa.reduce((acc, curr) => {
				if (!acc.includes(curr)) acc.push(curr)
				return acc
			}, [])
			if (dupa2.length > 1) {
				sum += +dupa2[0] * +dupa2[1]
			}
		}
	})
})

console.log(sum)
