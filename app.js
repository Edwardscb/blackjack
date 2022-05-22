const suits = ["C", "D", "H", "S"];
let cardArr = [];
const body = document.querySelector("body");
const hitMe = document.getElementById("hit");
const startButton = document.getElementById("start");
const stand = document.getElementById("stand");
const newHand = document.getElementById("newHand");
const newGame = document.getElementById("newGame");




//makes a 52 item array with each item
//corresponding to an image of a card
function makeDeck() {
for (let i = 0; i < suits.length; i++) {
let suit = suits[i];
for (let n = 1; n < 14; n++) {
if (n === 1) {
let newCard = `Img/A${suit}.jpg`;
cardArr.push(newCard);
} else if (n === 11) {
let newCard = `Img/J${suit}.jpg`;
cardArr.push(newCard);
} else if (n === 12) {
let newCard = `Img/Q${suit}.jpg`;
cardArr.push(newCard);
} else if (n === 13) {
let newCard = `Img/K${suit}.jpg`;
cardArr.push(newCard);
} else {
let newCard = `Img/${n}${suit}.jpg`;
cardArr.push(newCard);
};
}
}
}

class Player {
    constructor(name, playerCards = [], playerTotal =[]) {
    this.name = name; this.playerCards = playerCards;
    this.playerTotal = playerTotal}

//gets an item from the array at random
//and creates then assigns it to a div
// and then appends it to the body
// it also pushes the value of the card to the player
//array keeping track of their current hand
//then it calls the fxn to calculate the total
//of all the cards in the array
drawCard() {
let randNum = Math.floor(Math.random()*(cardArr.length));
let newDiv = document.createElement("div");
newDiv.setAttribute("id", "playedCard");
if (this.name === "Player One") {
newDiv.setAttribute("class", "p1card"); 

} else {
newDiv.setAttribute("class", "p2card");
};
newDiv.innerHTML = `<img class="card" src='${cardArr[randNum]}'>`;
this.playerCards.push( `${cardArr[randNum][4]}`);
body.append(newDiv);
cardArr.splice(randNum, 1);
this.calcTotal();
}

//clears the player total array and then iterates
//through the players current cards and 
//assigns a numeric point value to each card
//then using the array of point values, calculates
//the players total points also checks to see
//if the point value will cause the game to
//end and tells the user shortly after the 
//visual card is put on the board
calcTotal() {
this.playerTotal = [];
for (let i = 0; i < this.playerCards.length; i++) {
if  ((this.playerCards[i] == "K") || (this.playerCards[i] == "1") || (this.playerCards[i] == "Q") || (this.playerCards[i] == "J"))  {
this.playerTotal.push(10);
} else if (this.playerCards[i] === "A") {this.playerTotal.push(checkAce(this.playerTotal));
} else {
let cardValue = parseInt(this.playerCards[i]);
this.playerTotal.push(cardValue);
}
}
let total = 0;
for (let i = 0; i < this.playerTotal.length; i++) {
total = this.playerTotal[i] + total;
}
//checks for exactly 21
if (total == 21) {
setTimeout(() => {
alert(`${this.name} wins!`)}, 350);
hitMe.classList.toggle("hidden");
stand.classList.toggle("hidden");
p1standCounter = 0;
p2standCounter = 0;
if (cardArr.length > 20) {
newHand.classList.toggle("hidden");
} else { newGame.classList.toggle("hidden");
}
}
//checks for a bust
if (total > 21) {
setTimeout(() => {
alert(`${this.name} is busted! Other player wins!`)}, 350)
hitMe.classList.toggle("hidden");
stand.classList.toggle("hidden");
p1standCounter = 0;
p2standCounter = 0;
if (cardArr.length > 20) {
newHand.classList.toggle("hidden");
} else { newGame.classList.toggle("hidden");
}
}
}
}

//appends the item to the body so i can see
//how it looks and also check to make sure
//that it is doing what i want
function confirmResults(item) {
const newDiv = document.createElement("div");
newDiv.innerText = item;
body.append(newDiv);
}
const p1 = new Player("Player One");
const p2 = new Player("Player Two");
let curr_player = p1;

function checkAce(arr) {
let total = 11;
for (let i = 0; i < arr.length; i++) {
total = total + arr[i]
};

if (total >  21) {return 1} 
else {return 11}
};

//removes all cards from the DOM and clears the arrays that have cards and totals for each player
//then it clicks the start button and alerts the player of whose turn it is
newHand.addEventListener("click", (e) => {
let playedCards = document.querySelectorAll("#playedCard");
playedCards.forEach(e => e.remove());

p1.playerCards.length = 0;
p1.playerTotal.length = 0;
p2.playerCards.length = 0;
p2.playerTotal.length = 0;

startButton.click();
newHand.classList.toggle("hidden");
alert(`${curr_player.name} its your turn`);

});
//compares player 1 and player 2 totals when both of them have clicked stand
function checkForWinner() {
let p1Score = 0;
let p2Score = 0;
for (let i = 0; i < p1.playerTotal.length; i++) {
p1Score = p1Score + p1.playerTotal[i];
};
for (let i = 0; i < p2.playerTotal.length; i++) {
p2Score = p2Score + p2.playerTotal[i];
};
if (p1Score > p2Score) {
alert("Player One wins!")}
else if (p2Score > p1Score) {
alert("Player Two wins!")}
else if (p1Score == p2Score) {
alert("Its a tie!!")}
p1standCounter = 0;
p2standCounter = 0;
newHand.classList.toggle("hidden");
hitMe.classList.toggle("hidden");
stand.classList.toggle("hidden");
};

let p1standCounter = 0;
let p2standCounter = 0;

hitMe.addEventListener("click", (evt) => {curr_player.drawCard(); if (p2standCounter == 1) {curr_player = p1} else if (p1standCounter == 1) {curr_player = p2} else if (curr_player == p1) {curr_player = p2} else {curr_player = p1}; });
startButton.addEventListener("click", (evt) => {
startButton.classList.add("hidden");
hitMe.classList.toggle("hidden");
stand.classList.toggle("hidden");
p1.drawCard();p2.drawCard();p1.drawCard();p2.drawCard();
});
stand.addEventListener("click", (e) => {if (((p1standCounter == 1) && (curr_player == p2)) || ((p2standCounter == 1) && (curr_player == p1)) || ((p2standCounter == 1) && (p1standCounter == 1))) {checkForWinner()} else if (curr_player == p1) { p1standCounter = 1; alert("Player Two its your turn"); curr_player = p2} else if (curr_player == p2) { p2standCounter = 1; alert("Player One its your turn"); curr_player = p1}});


makeDeck();