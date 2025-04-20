document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const movesDisplay = document.getElementById('moves');
    const resetButton = document.getElementById('resetButton');

    const symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D']; // Define your pairs
    let shuffledSymbols = shuffleArray(symbols);
    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let matchedPairs = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        return card;
    }

    function setupBoard() {
        shuffledSymbols.forEach(symbol => {
            const card = createCard(symbol);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                moves++;
                movesDisplay.textContent = moves;
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const symbol1 = card1.querySelector('.card-back').textContent;
        const symbol2 = card2.querySelector('.card-back').textContent;

        if (symbol1 === symbol2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === symbols.length / 2) {
                setTimeout(() => alert(`You won in ${moves} moves!`), 500);
            }
            resetFlippedCards();
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                resetFlippedCards();
            }, 1000);
        }
    }

    function resetFlippedCards() {
        flippedCards = [];
    }

    function resetGame() {
        gameBoard.innerHTML = '';
        shuffledSymbols = shuffleArray(symbols);
        cards = [];
        flippedCards = [];
        moves = 0;
        matchedPairs = 0;
        movesDisplay.textContent = moves;
        setupBoard();
    }

    resetButton.addEventListener('click', resetGame);

    setupBoard();
});