/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundscore, activePlayer;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  //1. Random number
  var dice = Math.floor(Math.random() * 6) + 1;

  //2. Display the result

  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png"; //change the image

  //3. Update the round score if the rolled number is not 1

  if (dice !== 1) {
    //Add score
    roundscore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundscore;
  } else {
    //Next player
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  //Add current score to globl score
  scores[activePlayer] += roundscore;

  //Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  //Check if player won the game

  if (scores[activePlayer] >= 100) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    document.querySelector(".btn-roll").disabled = true;
    document.querySelector(".btn-hold").disabled = true;
  } else {
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundscore = 0;
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player-1";
  document.getElementById("name-1").textContent = "Player-2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".btn-roll").disabled = false;
  document.querySelector(".btn-hold").disabled = false;
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundscore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Toggle the active player
  document.querySelector(".player-0-panel").classList.toggle("active"); //adds the class if not there else removes the class
  document.querySelector(".player-1-panel").classList.toggle("active");
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector(".dice").style.display = "none";
}

//document.querySelector('#current-'+activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>'
