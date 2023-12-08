import { describe, expect, test } from '@jest/globals'
import { calculateTotalWinningCombinations, calculateWinningCombinations, parseMultipleRaceData, parseSingleRaceData } from '../../../../src/2023/days/day6/index.js'

const mockDataMultiple = [
  'Time:      7  15   30',
  'Distance:  9  40  200'
]

const mockDataSingle = [
  'Time:      7',
  'Distance:  9'
]

describe('Day 6: Wait For It (2023)', () => {
  test('correctly parses multiple race data', () => {
    const result = parseMultipleRaceData(mockDataMultiple)
    expect(result).toEqual([
      { time: 7, distance: 9 },
      { time: 15, distance: 40 },
      { time: 30, distance: 200 }
    ])
  })

  test('correctly parses single race data', () => {
    const result = parseSingleRaceData(mockDataSingle)
    expect(result).toEqual({ time: 7, distance: 9 })
  })

  test('calculates correct winning combinations for a single race', () => {
    const race = { time: 7, distance: 9 }
    const result = calculateWinningCombinations(race)
    expect(result).toBe(4)
  })

  test('calculates correct total winning combinations for multiple races', () => {
    const result = calculateTotalWinningCombinations(mockDataMultiple)
    expect(result).toBe(288)
  })
})
