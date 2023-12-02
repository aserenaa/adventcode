import { readFile } from '../../Utils/readFile.js'

const numberMap = {
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

const numberList = Object.keys(numberMap)

const calibrateValue = (string) => {
  const firstDigit = string.match(/\d/)
  const lastDigit = string.match(/\d(?=[^\d]*$)/)

  if (firstDigit && lastDigit) {
    return parseInt(`${firstDigit}${lastDigit}`, 10)
  }
}

const convertStringToNumber = (string) => {
  if (string.match(/\d+/g)) {
    return string.match(/\d+/g).pop()
  } else if (numberList.some((number) => string.includes(number))) {
    const number = numberList.find((number) => string.includes(number))
    return numberMap[number]
  }
}

const calibrateNumber = (string) => {
  let leftWord = ''
  let rightWord = ''
  let firstNumber
  let lastNumber

  for (let i = 0; i < string.length; i++) {
    const firstChar = string[i]
    const lastChar = string[string.length - 1 - i]

    leftWord += firstChar
    rightWord = lastChar + rightWord

    if (firstNumber !== undefined && lastNumber !== undefined) {
      break
    }

    firstNumber = firstNumber === undefined ? convertStringToNumber(leftWord) : firstNumber
    lastNumber = lastNumber === undefined ? convertStringToNumber(rightWord) : lastNumber
  }

  return parseInt(`${firstNumber}${lastNumber}`, 10)
}

const data = readFile(`${process.cwd()}/2023/Day 1/data/puzzle.txt`)

const part1Result = data.reduce((acc, string) => acc + calibrateValue(string), 0)
const part2Result = data.reduce((acc, string) => acc + calibrateNumber(string), 0)

console.log('--- Day 1: Trebuchet? ---')
console.log(`Part 1: ${part1Result}`)
console.log(`Part 2: ${part2Result}`)
