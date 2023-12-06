import { readFile } from '../../Utils/readFile.js'

const numberDictionary = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const numberList = Object.keys(numberDictionary)

const calibrateValue = (games) => {
  return games.reduce((acc, game) => {
    const firstDigit = game.match(/\d/)
    const lastDigit = game.match(/\d(?=[^\d]*$)/)

    if (firstDigit && lastDigit) {
      return acc + parseInt(`${firstDigit}${lastDigit}`, 10)
    }
    return acc
  }, 0)
}

const convertStringToNumber = (string) => {
  if (string.match(/\d+/g)) {
    return string.match(/\d+/g).pop()
  } else if (numberList.some((number) => string.includes(number))) {
    const number = numberList.find((number) => string.includes(number))
    return numberDictionary[number]
  }
}

const calibrateNumber = (games) => {
  return games.reduce((acc, game) => {
    let leftWord = ''
    let rightWord = ''
    let firstNumber
    let lastNumber

    for (let i = 0; i < game.length; i++) {
      const firstChar = game[i]
      const lastChar = game[game.length - 1 - i]

      leftWord += firstChar
      rightWord = lastChar + rightWord

      if (firstNumber !== undefined && lastNumber !== undefined) {
        break
      }

      firstNumber = firstNumber === undefined ? convertStringToNumber(leftWord) : firstNumber
      lastNumber = lastNumber === undefined ? convertStringToNumber(rightWord) : lastNumber
    }

    return acc + parseInt(`${firstNumber}${lastNumber}`, 10)
  }, 0)
}

// eslint-disable-next-line no-unused-vars
const runTests = () => {
  const data = readFile(`${process.cwd()}/data/2023/day1/test.txt`)
  console.log(calibrateValue(data))
  console.log(calibrateNumber(data))
}

const data = readFile(`${process.cwd()}/data/2023/day1/test.txt`)
console.log('--- Day 1: Trebuchet? ---')
console.log(`Part 1: ${calibrateValue(data)}`)
console.log(`Part 2: ${calibrateNumber(data)}`)
runTests()
