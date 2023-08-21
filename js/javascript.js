const personagens = [
    "khaldrogo", "daenerys", "tyrion", "missandei", "jonsnow",
    "khaldrogo", "daenerys", "tyrion", "missandei", "jonsnow",
];

const gameBoard = document.querySelector(".game-board");
let cardsChosen = [];
let cardsChosenId = [];
let cardsMatched = [];

function createBoard() {
    for (let i = 0; i < personagens.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", "img/back.png");
        card.setAttribute("data-id", i);
        card.classList.add("card");
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    }
    shuffleCards();
}

function shuffleCards() {
    personagens.sort(() => 0.5 - Math.random());
}

function flipCard() {
    const cardId = this.getAttribute("data-id");
    if (!cardsChosenId.includes(cardId) && cardsChosenId.length < 2) {
        cardsChosen.push(personagens[cardId]);
        cardsChosenId.push(cardId);
        this.setAttribute("src", `img/${personagens[cardId]}.png`);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const [id1, id2] = cardsChosenId;
    if (cardsChosen[0] === cardsChosen[1] && id1 !== id2) {
        cards[id1].classList.add("matched");
        cards[id2].classList.add("matched");
        cardsMatched.push(cardsChosen[0]);
        if (cardsMatched.length === personagens.length / 2) {
            alert("Parabéns, você ganhou o jogo!");
        }
    } else {
        setTimeout(() => {
            cards[id1].setAttribute("src", "img/back.png");
            cards[id2].setAttribute("src", "img/back.png");
        }, 300);
    }
    cardsChosen = [];
    cardsChosenId = [];
}

createBoard();