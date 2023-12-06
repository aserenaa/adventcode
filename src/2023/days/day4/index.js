import { readFile } from '../../../utils/readFile.js'

function parseCardData (cards) {
  return cards.map(card => {
    const [winningPart, yourPart] = card.split('|').map(part => part.trim().split(/\s+/).map(Number))
    return {
      winningPart: new Set(winningPart),
      yourPart
    }
  })
}

function calculateScratchcardPoints (cardData) {
  return cardData.reduce((totalPoints, { winningPart, yourPart }) => {
    const matches = yourPart.reduce((acc, num) => acc + winningPart.has(num), 0)
    const points = matches > 0 ? Math.pow(2, matches - 1) : 0
    return totalPoints + points
  }, 0)
}

function countTotalScratchcards (cardData) {
  const totalCards = Array(cardData.length).fill(0)
  const stack = cardData.map((_, index) => ({ cardIndex: index, count: 1 }))

  while (stack.length > 0) {
    const { cardIndex, count } = stack.pop()
    totalCards[cardIndex] += count

    const matches = cardData[cardIndex].yourPart.reduce((acc, num) => acc + cardData[cardIndex].winningPart.has(num), 0)

    for (let i = 1; i <= matches && cardIndex + i < cardData.length; i++) {
      stack.push({ cardIndex: cardIndex + i, count })
    }
  }

  return totalCards.reduce((a, b) => a + b)
}

const runTests = () => {
  const data = readFile(`${process.cwd()}/data/2023/day4/test.txt`)
  const cardData = parseCardData(data)
  console.log(cardData)
  console.log(calculateScratchcardPoints(cardData))
  console.log(countTotalScratchcards(cardData))
}

runTests()
