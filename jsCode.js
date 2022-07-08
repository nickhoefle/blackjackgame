const input = require('readline-sync');

let deck = [
  'A♥️', '2♥️', '3♥️', '4♥️', '5♥️', '6♥️', '7♥️', '8♥️', '9♥️', '10♥️', 'J♥️', 'Q♥️', 'K♥️',
  'A♠️', '2♠️', '3♠️', '4♠️', '5♠️', '6♠️', '7♠️', '8♠️', '9♠️', '10♠️', 'J♠️', 'Q♠️', 'K♠️',
  'A♦️', '2♦️', '3♦️', '4♦️', '5♦️', '6♦️', '7♦️', '8♦️', '9♦️', '10♦️', 'J♦️', 'Q♦️', 'K♦️',
  'A♣️', '2♣️', '3♣️', '4♣️', '5♣️', '6♣️', '7♣️', '8♣️', '9♣️', '10♣️', 'J♣️', 'Q♣️', 'K♣️'];
let deckValues = [
  11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
];

let chips = 500;
let playerHand = [];
let dealerHand = [];
let cardPile = [];
let playerTotal = 0; 
let dealerTotal = 0;
let aceCountDealer = 0;
let aceCountPlayer = 0;
let betInteger = 0;

function bet() {
    console.log(`Chips: ${chips}`);
    betInteger = input.question('Place Your Bet (type a number and press enter): ')
    return betInteger;
}

function deal() {
    console.clear();
    let playerCard1 = Math.floor(Math.random() * 51) + 0; 
    let dealerCard1 = Math.floor(Math.random() * 51) + 0;
    let playerCard2 = Math.floor(Math.random() * 51) + 0;
    let dealerCard2 = Math.floor(Math.random() * 51) + 0;

      if ((playerCard1 === dealerCard1) || (playerCard1 ===             dealerCard2) || (playerCard1 === playerCard2) ||                (dealerCard1 === dealerCard2) || (dealerCard1 ===               playerCard1) || (dealerCard1 === playerCard2) ||                (dealerCard2 === dealerCard1) || (dealerCard2 ===               playerCard1) || (dealerCard2 === playerCard2)) {
            deal();
            return;
        }

      if ((playerCard1 === undefined) || (playerCard2 ===                 undefined) || (dealerCard1 === undefined) ||                    (dealerCard2 === undefined)) {
            deal();
            return;
        }

       for (let i=0; i < cardPile.length; i++) {
        if ((playerCard1 === cardPile[i]) || (playerCard2 ===             cardPile[i]) || (dealerCard1 === cardPile[i]) ||                (dealerCard2 === cardPile[i])) {
            deal();
            return;
        }
      }
    playerHand.push(deck[playerCard1]);
    playerHand.push(deck[playerCard2]);
    dealerHand.push(deck[dealerCard1]);
    dealerHand.push(deck[dealerCard2]);
    cardPile.push(playerCard1);
    cardPile.push(playerCard2);
    cardPile.push(dealerCard1);
    cardPile.push(dealerCard2); 
  
    bet();

    console.log();
    console.log(`Dealer Showing: ${dealerHand[0]}`)
    console.log(`Player Hand: ${playerHand}`)
 
    playerOption();
}

function returnCards() {
    playerHand = [];
    dealerHand = [];
    playerTotal = [];
}

function aceCounterPlayer() {
aceCountPlayer = 0;    
    for (let i=0; i<playerHand.length; i++){
        if ((playerHand[i] === 'A♣️') ||
            (playerHand[i] === 'A♦️') ||
            (playerHand[i] === 'A♥️') ||
            (playerHand[i] === 'A♠️')){
            aceCountPlayer += 1;
        }
    }
    return aceCountPlayer;
}

function aceCounterDealer() {
aceCountDealer = 0;    
    for (let i=0; i<dealerHand.length; i++){
        if ((dealerHand[i] === 'A♣️') ||
            (dealerHand[i] === 'A♦️') ||
            (dealerHand[i] === 'A♥️') ||
            (dealerHand[i] === 'A♠️')){
            aceCountDealer += 1;
        }
        
    }
    return aceCountDealer;
}

function calculatePlayerTotal() {
    playerTotal = 0;
    for (let i=0; i<playerHand.length; i++) {
        playerTotal += deckValues[deck.indexOf(playerHand[i])];
        }
    if (playerTotal > 21 && aceCountPlayer === 0) {
        playerTotal = playerTotal;
        }    
    if (playerTotal > 21 && aceCountPlayer === 1) {
        playerTotal = playerTotal - 10;
        }
    if (playerTotal > 41 && aceCountPlayer === 2) {
        playerTotal = playerTotal - 20;
        return playerTotal;
        }
     if (playerTotal > 31 && aceCountPlayer === 2) {
        playerTotal = playerTotal - 20;
        return playerTotal;
        }
    if (playerTotal > 21 && aceCountPlayer === 2) {
        playerTotal = playerTotal - 10;
        }    
    if (playerTotal > 41 && aceCountPlayer === 3) {
        playerTotal = playerTotal - 30;
        return playerTotal;
        }
     if (playerTotal > 31 && aceCountPlayer === 3) {
        playerTotal = playerTotal - 20;
        }
    if (playerTotal > 21 && aceCountPlayer === 3) {
        playerTotal = playerTotal - 10;
        }  
    if (playerTotal > 61 && aceCountPlayer === 4) {
        playerTotal = playerTotal - 40;
        return playerTotal;
        }
    if (playerTotal > 51 && aceCountPlayer === 4) {
        playerTotal = playerTotal - 40;
        return playerTotal;
        } 
    return playerTotal;
}

function calculateDealerTotal() {
    dealerTotal = 0;
    for (let i=0; i<dealerHand.length; i++) {
        dealerTotal += deckValues[deck.indexOf(dealerHand[i])];
    }
    if (dealerTotal > 21 && aceCountDealer === 0) {
        dealerTotal = dealerTotal;
        }    
    if (dealerTotal > 21 && aceCountDealer === 1) {
        dealerTotal = dealerTotal - 10;
        }
    if (dealerTotal > 41 && aceCountDealer === 2) {
        dealerTotal = dealerTotal - 20;
        return dealerTotal;
        }
     if (dealerTotal > 31 && aceCountDealer === 2) {
        dealerTotal = dealerTotal - 20;
        return dealerTotal;
        }
    if (dealerTotal > 21 && aceCountDealer === 2) {
        dealerTotal = dealerTotal - 10;
        }    
    if (dealerTotal > 41 && aceCountDealer === 3) {
        dealerTotal = dealerTotal - 30;
        return dealerTotal;
        }
     if (dealerTotal > 31 && aceCountDealer === 3) {
        dealerTotal = dealerTotal - 20;
        }
    if (dealerTotal > 21 && aceCountDealer === 3) {
        dealerTotal = dealerTotal - 10;
        }  
    if (dealerTotal > 61 && aceCountDealer === 4) {
        dealerTotal = dealerTotal - 40;
        return dealerTotal;
        }
    if (dealerTotal > 51 && aceCountDealer === 4) {
        dealerTotal = dealerTotal - 40;
        return dealerTotal;
        } 
    return dealerTotal;
}

function drawPlayerCard(){
playerCardDrawn = Math.floor(Math.random() * 51) + 0;
    for (let i=0; i<cardPile.length; i++){
        if (playerCardDrawn === cardPile[i]){
            drawPlayerCard();
            return;
        }
    }
    playerHand.push(deck[playerCardDrawn]);
    cardPile.push(playerCardDrawn);
}

function drawDealerCard(){
dealerCardDrawn = Math.floor(Math.random() * 51) + 0;
    for (let i=0; i<cardPile.length; i++){
        if (dealerCardDrawn === cardPile[i]){
            drawDealerCard();
            return;
        }
    }
  dealerHand.push(deck[dealerCardDrawn]);
  cardPile.push(dealerCardDrawn);
}

function playerOption(){
    console.log();
    choice = input.question('Hit (h) or stand (s)?: ')
    while (choice === 'h'){
        drawPlayerCard();
        aceCounterPlayer();
        calculatePlayerTotal();
        console.log();
        console.log(`Player Hand: ${playerHand}`);
        console.log(`Player Total: ${playerTotal}`)
        if (playerTotal > 21){
            console.log('Player Bust!')
            chips -= Number(betInteger);
            console.log(`New Chip Total: ${chips}`)
            console.log();
            playAgain();
        }
            playerOption();
    }

        if (choice === 's'){
            console.log();
            aceCounterPlayer();
            calculatePlayerTotal();
            console.log(`Player Hand: ${playerHand}`);
            console.log(`Player Total: ${playerTotal}`)
            console.log();
            dealerOption();
            console.log();
            score();
        }
}

function dealerOption(){
    aceCounterDealer();
    calculateDealerTotal();
    if (dealerTotal === 17){
        console.log(`Dealer Hand: ${dealerHand}`);
        console.log(`Dealer Total: ${dealerTotal}`);
        return;
    }
    if (dealerTotal > 17){
        console.log(`Dealer Hand: ${dealerHand}`);
        console.log(`Dealer Total: ${dealerTotal}`);
        return;
    }
    if (dealerTotal < 17) {
        drawDealerCard();
    }
    dealerOption();
    return;
}

function score(){
    if (dealerTotal > 21){
        console.log('Dealer Bust!');
        chips += Number(betInteger);
        console.log(`New Chip Total: ${chips}`)
        playAgain();
        return;
    }
    if (playerTotal > dealerTotal) {
        console.log('Player Wins!');
        chips += Number(betInteger);
        console.log(`New Chip Total: ${chips}`)
    }
    if (playerTotal < dealerTotal) {
        console.log('Dealer Wins!');
        chips -= Number(betInteger);
        console.log(`New Chip Total: ${chips}`)
    }
    if (playerTotal === dealerTotal) {
        console.log('Push!');
        chips += 0
        console.log(`New Chip Total: ${chips}`)
    }
    playAgain();
}

function playAgain(){
    playAgainOption = input.question('Play again? (y/n): ')
    if (playAgainOption === 'y'){
        returnCards();
        deal();
        return;
    }
}

function returnCards(){
    playerTotal = 0;
    dealerTotal = 0;
    cardPile = [];
    dealerHand = [];
    playerHand = [];
}

deal();
