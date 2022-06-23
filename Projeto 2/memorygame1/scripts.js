// scritps.js

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard; secondCard;

function flipCard() {
    this.classList.add('flip');

    if(!hasFlippedCard) {
        //primeiro click

        hasFlippedCard = true;
        firstCard = this;
    }

    else{
        //segundo click

        hasFlippedCard = false;
        secondCard = this;

        console.log({{firstCard,secondCard});
    }
}
cards.forEach(card => card.addEventListener('click', flipCard));