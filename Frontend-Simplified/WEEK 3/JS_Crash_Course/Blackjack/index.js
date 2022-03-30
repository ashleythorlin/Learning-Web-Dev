let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = true
let message = ""
let canStart = true

//PLAYER DATA
let player = {
    name: "Ashley",
    chips: 100,
    sayHello: function(){
        console.log("Hi there " + player.name + "!")
    }
}

function updatePlayer(){
    document.querySelector("#player-el").textContent = player.name + ": $" + player.chips
}

function getRandomCard(){
    let randomNum =  Math.floor(Math.random()*13) + 1
    if(randomNum > 10) {
        return 10
    } else if (randomNum === 1){
        return 11
    } else {
        return randomNum
    }
}

function renderGame(){
    document.querySelector("#cards-el").textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        document.querySelector("#cards-el").textContent += cards[i] + " ";
    }
    document.querySelector("#sum-el").textContent = "Sum: " + sum;

    if(sum < 21){
        message = "Do you want to draw a new card?"
    } else if (sum === 21){
        message = "You got Blackjack! Click Start Game to play again."
        player.chips += 20
        hasBlackjack = true
        canStart = true
    } else {
        message = "You're out of the game! Click Start Game to play again."
        isAlive = false
        canStart = true
    }
    document.getElementById("message-el").textContent = message;
    updatePlayer()
}

function startGame(){
    if(canStart && player.chips > 4){
        canStart = false
        isAlive = true
        hasBlackjack = false

        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        player.chips -= 5
        updatePlayer()
        renderGame()
    } else if(player.chips < 5){
        document.getElementById("message-el").textContent = "You cannot play because you are out of chips.";
    }

}

function newCard(){
    if(!hasBlackjack && isAlive && !canStart){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

updatePlayer()
player.sayHello()