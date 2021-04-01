'use strict';
//Selecting Elements
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScr = document.querySelector('#current--0');
const diceEl = document.querySelector('.dice');

//Starting Conditions
let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  scores = [0, 0]; //Final scores that accumulated
  currentScore = 0; //This cannot be in the event handler function because then it would be set to zero each time that we clicked the button
  activePlayer = 0;
  playing = true;
  //remove winner class and add active class to the player 1
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  //set total score = 0
  score1El.textContent = 0;
  score2El.textContent = 0;
  //set current score = 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  //remove dice
  diceEl.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Before we do the switch, we need to change the score!
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    //Check for rolled 1
    if (diceNumber !== 1) {
      //Add dice to current score
      currentScore += diceNumber;
      //Building ID name dynamically
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch to next Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to the score of active player
    scores[activePlayer] += currentScore; //score[1] = score [1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check score >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //Removing it because otherwise, we'll have the player--active class at the same the player--winner class.
    } else {
    }
    //Finish game
    //Switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
