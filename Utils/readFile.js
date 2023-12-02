import fs from 'fs'

export const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    const dataArray = data.split('\n')
    return dataArray
  } catch (error) {
    console.error(`Error reading file: ${error}`)
    return []
  }
}
