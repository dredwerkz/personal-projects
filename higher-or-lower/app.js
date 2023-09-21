/*


*/

const hintContainer = document.getElementById("hintContainer");
const cardInput = document.getElementById("cardInput");
const submitCardButton = document.getElementById("submitCard");

const cards = {
    deck: [],
    hand: [],
};

function generateDeck() {
    cards.deck = [];
    for (i = 0; i < 13; i++) {
        // For loop to generate every card and suit
        if (i == 0) {
            console.log("Doing Aces");
            i = "A";
            for (j = 0; j < 4; j++) {
                if (j == 0) {
                    cards.deck.push(`${i}♣`);
                } else if (j == 1) {
                    cards.deck.push(`${i}♠`);
                } else if (j == 2) {
                    cards.deck.push(`${i}♥`);
                } else if (j == 3) {
                    cards.deck.push(`${i}♦`);
                }
            }
            i = 0;
        } else if (i == 1) {
            console.log("Doing Jacks");
            i = "J";
            for (j = 0; j < 4; j++) {
                if (j == 0) {
                    cards.deck.push(`${i}♣`);
                } else if (j == 1) {
                    cards.deck.push(`${i}♠`);
                } else if (j == 2) {
                    cards.deck.push(`${i}♥`);
                } else if (j == 3) {
                    cards.deck.push(`${i}♦`);
                }
            }
            i = 1;
        } else if (i == 11) {
            console.log("Doing Queens");
            i = "Q";
            for (j = 0; j < 4; j++) {
                if (j == 0) {
                    cards.deck.push(`${i}♣`);
                } else if (j == 1) {
                    cards.deck.push(`${i}♠`);
                } else if (j == 2) {
                    cards.deck.push(`${i}♥`);
                } else if (j == 3) {
                    cards.deck.push(`${i}♦`);
                }
            }
            i = 11;
        } else if (i == 12) {
            console.log("Doing Kings");
            i = "K";
            for (j = 0; j < 4; j++) {
                if (j == 0) {
                    cards.deck.push(`${i}♣`);
                } else if (j == 1) {
                    cards.deck.push(`${i}♠`);
                } else if (j == 2) {
                    cards.deck.push(`${i}♥`);
                } else if (j == 3) {
                    cards.deck.push(`${i}♦`);
                }
            }
            i = 13;
        } else {
            console.log("Running 2s to 10s");
            for (j = 0; j < 4; j++) {
                if (j == 0) {
                    cards.deck.push(`${i}♣`);
                } else if (j == 1) {
                    cards.deck.push(`${i}♠`);
                } else if (j == 2) {
                    cards.deck.push(`${i}♥`);
                } else if (j == 3) {
                    cards.deck.push(`${i}♦`);
                }
            }
        }
    }

    console.log(cards.deck);
    cards.deck.sort();
    cards.deck.reverse();
    console.log(cards.deck);
    console.log("Generating Buttons!");

    hintContainer.innerHTML = null;

    for (i = 0; i < 52; i++) {
        // Button Generator
        let lineBreak = document.createElement(`br`)
        let newButton = document.createElement(`button`);
        newButton.value = cards.deck[i];
        
        newButton.style.width = "20%";
        newButton.style.padding = "8px";
        newButton.textContent = cards.deck[i];
        //newButton.classList.add() = "cardSelectors";
        if (i % 4 == 0) {
                hintContainer.appendChild(lineBreak)
                hintContainer.appendChild(newButton);
        }
        hintContainer.appendChild(newButton);
    }

}

function addNextCard() {
    let newCard = cardInput.value;
    console.log(`${newCard} was entered`);
    if (newCard.length > 2) {
        alert(`Invalid input! Try just '2' or '5C', for example`);
    }
}

submitCardButton.addEventListener("click", generateDeck);
