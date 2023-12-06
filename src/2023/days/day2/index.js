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

export { fewestNumberOfCubes, isGameValid, parseGameData }
