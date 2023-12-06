import fs from 'fs'

// Parsing for Part One (individual seeds)
function parseInput1 (lines) {
  const sections = lines.join('\n').split('\n\n')
  const seeds = sections[0].split(': ')[1].split(' ').map(Number)
  const maps = sections.slice(1).map(section =>
    section.split('\n').slice(1).join('\n')
  )
  return { seeds, maps }
}

// Parsing for Part Two (seed ranges)
function parseInput2 (lines) {
  const sections = lines.join('\n').split('\n\n')
  const seedRanges = sections[0].split(': ')[1].split(' ').map(Number)
  const seeds = []
  for (let i = 0; i < seedRanges.length; i += 2) {
    for (let j = 0; j < seedRanges[i + 1]; j++) {
      seeds.push(seedRanges[i] + j)
    }
  }
  const maps = sections.slice(1).map(section =>
    section.split('\n').slice(1).join('\n')
  )
  return { seeds, maps }
}

// Common functions for creating maps and converting numbers
function createMap (mapString) {
  const ranges = mapString.split('\n').map(line => {
    const [destStart, srcStart, length] = line.split(' ').map(Number)
    return { srcStart, srcEnd: srcStart + length - 1, destStart }
  })
  return ranges
}

function convertNumber (number, ranges) {
  for (const range of ranges) {
    if (number >= range.srcStart && number <= range.srcEnd) {
      return range.destStart + (number - range.srcStart)
    }
  }
  return number
}

function findLowestLocation (seeds, mapsArray) {
  let lowestLocation = Infinity
  seeds.forEach(seed => {
    let value = seed
    for (const map of mapsArray) {
      value = convertNumber(value, map)
    }
    lowestLocation = Math.min(lowestLocation, value)
  })
  return lowestLocation
}

// Example usage for Part One
const filePath = `${process.cwd()}/data/2023/day5/test.txt`
const data1 = fs.readFileSync(filePath, 'utf8').split('\n')
const { seeds: seeds1, maps: maps1 } = parseInput1(data1)
const mapsArray1 = maps1.map(createMap)
console.log(findLowestLocation(seeds1, mapsArray1))

// Example usage for Part Two
const data2 = fs.readFileSync(filePath, 'utf8').split('\n')
const { seeds: seeds2, maps: maps2 } = parseInput2(data2)
const mapsArray2 = maps2.map(createMap)
console.log(findLowestLocation(seeds2, mapsArray2))
