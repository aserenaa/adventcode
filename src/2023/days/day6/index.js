import { readFile } from '../../../utils/readFile.js'

// Parses race data for multiple races
const parseMultipleRaceData = (data) => {
  const times = data[0].split(/\s+/).slice(1).map(Number)
  const distances = data[1].split(/\s+/).slice(1).map(Number)

  return times.map((time, index) => ({
    time,
    distance: distances[index]
  }))
}

// Parses race data for a single race
const parseSingleRaceData = (data) => {
  const time = Number(data[0].split(/\s+/).slice(1).join(''))
  const distance = Number(data[1].split(/\s+/).slice(1).join(''))

  return { time, distance }
}

// Calculate winning combinations for a single race
const calculateWinningCombinations = (race) => {
  let winningCombinations = 0
  for (let holdTime = 0; holdTime < race.time; holdTime++) {
    const travelTime = race.time - holdTime
    const distance = holdTime * travelTime
    if (distance > race.distance) {
      winningCombinations++
    }
  }
  return winningCombinations
}

// Calculate total winning combinations for multiple races
const calculateTotalWinningCombinations = (data) => {
  const races = parseMultipleRaceData(data)
  const winningCombinations = races.map(calculateWinningCombinations)
  return winningCombinations.reduce((acc, cur) => acc * cur, 1)
}

// Calculate winning combinations for a single race (alternative approach)
const calculateWinningCombinationsSingleRace = (data) => {
  const race = parseSingleRaceData(data)
  return calculateWinningCombinations(race)
}

const runTests = () => {
  const data = readFile(`${process.cwd()}/data/2023/day6/test.txt`)
  console.log('Total Winning Combinations for Multiple Races:', calculateTotalWinningCombinations(data))
  console.log('Winning Combinations for Single Race:', calculateWinningCombinationsSingleRace(data))
}

runTests()
