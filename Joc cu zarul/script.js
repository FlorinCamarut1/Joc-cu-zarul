'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // e un pic mai rapid dar e la fel ca cel de sus.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const name0 = document.getElementById('name--0');
const name1 = document.getElementById('name--1');
let currentScore, activePlayer, playing, scores;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Conditii de inceput:

init();

//Functionalitate dat cu zarul...
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generam un numar random.
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2.DIsplay la zar.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Verificam daca e 1: daca da trecem la urmatoru player.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore;
      //Adaugam zarul la scorul curent ....
    } else {
      switchPlayer();
      //Trecem la urmatorul player....
    }
  }
});

//BUtonul de hold----------------
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Adaugam scorul la playerul activ..
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Verifici daca scorul e >= 100,
    if (scores[activePlayer] >= 100) {
      // termina jocul
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } wins`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // schimba playerul---
      switchPlayer();
    }
  }
});
//  New game-------------------------
btnNew.addEventListener('click', init);
