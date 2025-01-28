const myModule = (() => {

    'use strict';

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    const btnNewGame = document.querySelector('#btn-new-game'),
        btnGetCard = document.querySelector('#btn-get-card'),
        btnStopGame = document.querySelector('#btn-stop-game');

    const cardDivs = document.querySelectorAll('.card-div'),
        smalls = document.querySelectorAll('small');

    let playerPoints = [];

    const initGame = (numPlayers = 2) => {
        deck = createDeck();
        playerPoints = Array(numPlayers).fill(0);
        smalls.forEach((small, index) => {
            small.textContent = 0;
            cardDivs[index].innerHTML = '';
        });
        btnGetCard.disabled = false;
        btnStopGame.disabled = false;
    };

    const createDeck = () => {
        let newDeck = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                newDeck.push(`${i}${type}`);
            }
        }
        for (let type of types) {
            for (let special of specials) {
                newDeck.push(`${special}${type}`);
            }
        }
        return _.shuffle(newDeck);
    };

    const getCard = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    };

    const cardValue = (card) => {
        const value = card.slice(0, -1);
        return isNaN(value) ? (value === 'A' ? 11 : 10) : parseInt(value);
    };

    const accumulatePoints = (card, turn) => {
        playerPoints[turn] += cardValue(card);
        smalls[turn].textContent = playerPoints[turn];
        return playerPoints[turn];
    };

    const createCard = (card, turn) => {
        const img = document.createElement('img');
        img.src = `./assets/img/cartas/${card}.png`;
        img.classList.add('card');
        cardDivs[turn].appendChild(img);
    };

    const determineWinner = () => {
        const [minimunPoints, computerPoints] = playerPoints;

        setTimeout(() => {
            if (computerPoints === minimunPoints) {
                Swal.fire("All lose");

            } else if (minimunPoints > 21) {
                Swal.fire("Computer wins");

            } else if (computerPoints > 21) {
                Swal.fire("Player1 wins");

            } else {
                Swal.fire("Computer wins");

            }
        }, 1000);
    };

    const computerTurn = (minimunPoints) => {
        let computerPoints = 0;

        do {
            const card = getCard();
            computerPoints = accumulatePoints(card, playerPoints.length - 1);
            createCard(card, playerPoints.length - 1);

            if (minimunPoints > 21) {
                break;
            }
        } while (computerPoints < minimunPoints && minimunPoints <= 21);

        determineWinner();
    };

    btnGetCard.addEventListener('click', () => {
        const card = getCard();
        const playerPoints = accumulatePoints(card, 0);

        createCard(card, 0);

        if (playerPoints > 21) {
            Swal.fire("Player1 lost");
            btnGetCard.disabled = true;
            btnStopGame.disabled = true;
            computerTurn(playerPoints);
        } else if (playerPoints === 21) {
            Swal.fire("Player1 wins");
            btnGetCard.disabled = true;
            btnStopGame.disabled = true;
            computerTurn(playerPoints);
        }
    });

    btnStopGame.addEventListener('click', () => {
        btnGetCard.disabled = true;
        btnStopGame.disabled = true;
        computerTurn(playerPoints[0]);
    });

    btnNewGame.addEventListener('click', () => {
        initGame();
    });

    return {
        initGame
    };

})();
