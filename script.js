const deckOfCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const fourTimesDeckOfCards = [];
for (let i = 0; i < 4; i++) {
  fourTimesDeckOfCards.push(deckOfCards);
}

function pickRandom (myArray) {
  let card = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
  // J, Q, K = 10
  if (card == "J"|| card == "Q"|| card == "K" ){
    return 10;
  }
  // A = 1 or 11 (whichever is higher as long as total isn't over 21)
  if (card == "A") {
    return 11;
  }
  return card;
}

// Arrays for player cards and dealer cards
const playerCards = [];
const dealerCards = [];
let playerTotal = 0;
let dealerTotal = 0;
let gameDone = false;
let playerStands = false;

// Deal everyone 2 cards
for (let i = 0; i < 2; i++) {
  playerCards.push(pickRandom(deckOfCards));
  playerTotal += playerCards[i];
  dealerCards.push(pickRandom(deckOfCards));
  dealerTotal += dealerCards[i];
}

// Display player hand and dealer's hand (1 hidden card)
alert (`You hand is ${playerCards[0]} and ${playerCards[1]} (Total: ${playerTotal}). Dealer's hand is ${dealerCards[0]} and a hidden card.`)

// If player gets 21, and dealer does not have 21. Blackjack - player wins.
if (playerTotal === 21 && dealerTotal != 21) {
  alert ("You hit blackjack! You win.");
  gameDone = true;
}
// If both player and dealer get blackjack, push.
else if (playerTotal === 21 && dealerTotal == 21) {
  alert ("You hit blackjack. Dealer also hit blackjack. You push.")
}

// Player hits or stands
while (gameDone === false && playerStands === false) {
  playerChoice = prompt (`You total is ${playerTotal}. Hit or Stand?`, []);
  // Disregard capitalization for hit or stand. Lowercase user input to standardize.
  lowerCased = playerChoice.toLowerCase();
  console.log(lowerCased);
  // If player does not put "Hit" or "Stand" specifically, loop prompt
  while (lowerCased != "hit" && playerChoice != "stand") {
    alert ("Error: Check your spelling");
    playerChoice = prompt (`You total is ${playerTotal}. Hit or Stand?`, []);
    lowerCased = playerChoice.toLowerCase();
    console.log(`${lowerCased} inside while loop`);
  }
  // Player hits
  if (lowerCased == "hit") {
    let newPlayerCard = pickRandom(deckOfCards);
    playerTotal += newPlayerCard;
    // If new card is ace, and it goes over 21, make ace into a 1 and subtract 10.
    if (newPlayerCard == 11 && playerTotal > 21) {
      newPlayerCard = 1;
      playerTotal -= 11;
    }
    alert (`You hit ${newPlayerCard}. Your total is ${playerTotal}.`)
    // If player busts, game is over. Player loses.
    if (playerTotal > 21) {
      alert (`You bust. You lose.`);
      gameDone = true;
    }
  }
  // Player stands
  else if (lowerCased == "stand") {
    playerStands = true;
  }
}

// Dealer reveals hidden card if player did not bust
if (gameDone == false) {
  alert (`Dealer reveals hidden card - ${dealerCards[1]}. Dealer's hand is ${dealerCards[0]} and ${dealerCards[1]}. (Total: ${dealerTotal})`)
}

// Dealer hits until total is 17 or higher
while (gameDone == false && dealerTotal < 17) {
  let newDealerCard = pickRandom(deckOfCards);
  dealerTotal += newDealerCard;
  // If new card is ace, and it goes over 21, make ace into a 1 and subtract 10.
  if (newDealerCard == 11 && playerTotal > 21) {
    newDealerCard = 1;
    playerTotal -= 11;
    }
  alert (`Dealer hit ${newDealerCard}. Dealer total is ${dealerTotal}.`)
  // If dealer busts, game is over. Player wins.
  if (dealerTotal > 21) {
    alert ("Dealer has bust. You win.");
    gameDone = true;
  }
}

// If no one bust, compare totals and declare winner
if (gameDone == false) {
  if (playerTotal > dealerTotal) {
  alert (`You hit ${playerTotal} and dealer hit ${dealerTotal}. You win.`)
  }
  else if (playerTotal < dealerTotal) {
  alert (`You hit ${playerTotal} and dealer hit ${dealerTotal}. You lose.`)
  }
  else if (playerTotal == dealerTotal) {
  alert (`You hit ${playerTotal} and dealer hit ${dealerTotal}. You push.`)
  }
}