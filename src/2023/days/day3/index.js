import { readFile } from '../../../utils/readFile.js'

let total = 0
let board = []
const gearNums = new Map()

function considerNumberNeighbors (startY, startX, endY, endX, num) {
  console.log(`startY: ${startY}, startX: ${startX}, endY: ${endY}, endX: ${endX}, num: ${num}`)
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (y >= 0 && y < board.length && x >= 0 && x < board[y].length) {
        if (!'0123456789.'.includes(board[y][x])) {
          if (board[y][x] === '*') {
            const key = `${y},${x}`
            if (!gearNums.has(key)) {
              gearNums.set(key, [])
            }
            gearNums.get(key).push(num)
          }
          return true
        }
      }
    }
  }
  return false
}

function parseBoard (schematic) {
  board = schematic
  const numPattern = /\d+/g

  board.forEach((row, rowNum) => {
    let match
    while ((match = numPattern.exec(row)) !== null) {
      console.log(match, rowNum)
      if (considerNumberNeighbors(rowNum - 1, match.index - 1, rowNum + 1, match.index + match[0].length, parseInt(match[0]))) {
        total += parseInt(match[0])
      }
    }
  })
}

function calculateRatTotal () {
  let ratTotal = 0
  gearNums.forEach((v, k) => {
    if (v.length === 2) {
      ratTotal += v[0] * v[1]
    }
  })
  return ratTotal
}

// eslint-disable-next-line no-unused-vars
const runTests = () => {
  const data = readFile(`${process.cwd()}/data/2023/day3/test.txt`)
  // console.log(sumPartNumbers(data))
  console.log(data)
  parseBoard(data)
  console.log(total) // Outputs total sum of part numbers

  const ratTotal = calculateRatTotal()
  console.log(ratTotal) //
  // console.log(sumGearRatios(data))
}

runTests()

// const data = readFile(`${process.cwd()}/2023/Day 3/data/data.txt`)
// console.log('--- Day 3: Gear Ratios ---')
// console.log(`Part 1: ${data}`)
