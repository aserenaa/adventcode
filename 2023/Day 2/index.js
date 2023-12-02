import { readFile } from '../../Utils/readFile.js'

const isEmpty = (str) => str === '' || str === null || str === undefined

const calculateCubes = (subSet) => {
  const cubes = { red: 0, green: 0, blue: 0 }
  const colors = subSet.split(',').map(s => s.trim())
  for (const color of colors) {
    const [amount, colorName] = color.split(' ')
    cubes[colorName] = parseInt(amount, 10)
  }
  return cubes
}

const parseGameData = (data) => {
  const fixedData = []
  for (const line of data) {
    if (!isEmpty(line)) {
      const games = line.trim().split(':')
      const id = parseInt(games[0].split(' ')[1], 10)
      const subSets = games[1].split(';').map(s => s.trim())
      const cubes = subSets.map(calculateCubes)
      fixedData.push({ id, cubes })
    }
  }
  return fixedData
}

const isGameValid = (games, maxRed, maxGreen, maxBlue) => {
  return games.reduce((sum, game) => {
    let isValid = true
    for (const cube of game.cubes) {
      if (cube.red > maxRed || cube.green > maxGreen || cube.blue > maxBlue) {
        isValid = false
        break
      }
    }

    return isValid ? sum + game.id : sum
  }, 0)
}

const fewestNumberOfCubes = (games) => {
  return games.reduce((sum, game) => {
    const minCubes = { red: 0, green: 0, blue: 0 }
    for (const cube of game.cubes) {
      minCubes.red = Math.max(minCubes.red, cube.red)
      minCubes.green = Math.max(minCubes.green, cube.green)
      minCubes.blue = Math.max(minCubes.blue, cube.blue)
    }
    const power = minCubes.red * minCubes.green * minCubes.blue
    return sum + power
  }, 0)
}

// eslint-disable-next-line no-unused-vars
const runTests = () => {
  const data = readFile(`${process.cwd()}/2023/Day 2/data/test.txt`)
  const games = parseGameData(data)
  console.log(isGameValid(games, 12, 13, 14))
  console.log(fewestNumberOfCubes(games))
}

const data = readFile(`${process.cwd()}/2023/Day 2/data/puzzle.txt`)
console.log('--- Day 2: Cube Conundrum ---')
console.log(`Part 1: ${isGameValid(parseGameData(data), 12, 13, 14)}`)
console.log(`Part 2: ${fewestNumberOfCubes(parseGameData(data))}`)
