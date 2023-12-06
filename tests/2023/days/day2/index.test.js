import { beforeAll, describe, expect, test } from '@jest/globals'
import { fewestNumberOfCubes, isGameValid, parseGameData } from '../../../../src/2023/days/day2/index.js'
import { readFile } from '../../../../src/utils/readFile.js'

describe('Day 2: Cube Conundrum (2023)', () => {
  let games
  beforeAll(() => {
    const data = readFile(`${process.cwd()}/data/2023/day2/test.txt`)
    games = parseGameData(data)
  })

  test('isGameValid correctly calculates validity', () => {
    const result = isGameValid(games, 12, 13, 14)
    expect(result).toBe(8)
  })

  test('fewestNumberOfCubes correctly calculates the fewest number of cubes', () => {
    const result = fewestNumberOfCubes(games)
    expect(result).toBe(2286)
  })
})
