import fs from 'fs'

export const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8').split('\n')
  } catch (error) {
    console.error(`Error reading file: ${error}`)
    return []
  }
}
