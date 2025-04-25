import { FlashCard } from './flashcard.js'

interface CardStatus {
  getCard: () => FlashCard
  getResults: () => boolean[]
  getResponseTimes: () => number[]  // New method for response times
  recordResult: (success: boolean, timestamp?: number) => void  // Updated to accept timestamp
  clearResults: () => void
}

function newCardStatus(card: FlashCard): CardStatus {
  let successes: boolean[] = [];
  let responseTimes: number[] = [];  // Track response times
  
  return {
    getCard: () => card,
    getResults: () => successes.slice(),
    getResponseTimes: () => responseTimes.slice(),
    recordResult: function (success: boolean, timestamp?: number): void { 
      successes.push(success);
      responseTimes.push(timestamp || Date.now());  // Use provided timestamp or current time
    },
    clearResults: function (): void { 
      successes = [];
      responseTimes = [];
    }
  }
}

export { CardStatus, newCardStatus }