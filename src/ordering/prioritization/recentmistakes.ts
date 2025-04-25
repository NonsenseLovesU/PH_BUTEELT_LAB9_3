import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter(): CardOrganizer {
  return {
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      return cards.slice().sort((a, b) => {
        const aResults = a.getResults();
        const aTimes = a.getResponseTimes();
        const bResults = b.getResults();
        const bTimes = b.getResponseTimes();

        // Find most recent incorrect response time for each card
        let aLastIncorrectTime = 0;
        let bLastIncorrectTime = 0;

        // Find most recent incorrect time for card A
        for (let i = 0; i < aResults.length; i++) {
          if (!aResults[i] && aTimes[i] > aLastIncorrectTime) {
            aLastIncorrectTime = aTimes[i];
          }
        }

        // Find most recent incorrect time for card B
        for (let i = 0; i < bResults.length; i++) {
          if (!bResults[i] && bTimes[i] > bLastIncorrectTime) {
            bLastIncorrectTime = bTimes[i];
          }
        }

        // Sorting logic:
        if (aLastIncorrectTime === 0 && bLastIncorrectTime === 0) {
          return 0;  // Both correct, maintain order
        } else if (aLastIncorrectTime > 0 && bLastIncorrectTime === 0) {
          return -1; // Only A incorrect, comes first
        } else if (aLastIncorrectTime === 0 && bLastIncorrectTime > 0) {
          return 1;  // Only B incorrect, comes first
        } else {
          // Both incorrect, most recent comes first
          return bLastIncorrectTime - aLastIncorrectTime;
        }
      });
    }
  }
}

export { newRecentMistakesFirstSorter }