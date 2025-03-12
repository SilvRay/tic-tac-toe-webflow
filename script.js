const $heading = document.querySelector(".heading");
const $restartBtn = document.querySelector(".restart_button");
const $boxes = Array.from(document.querySelectorAll(".box"));

const globalStyles = document.querySelector(".global-styles");

const winningIndicator = window
  .getComputedStyle(globalStyles)
  .getPropertyValue("--winning-indicator");

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startingGame = () => {
  $boxes.forEach((box) => {
    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id; // un id égale à 1 par exemple venant de <div class="box" id="1"></div>

  // Vérifier si l'espace à un index particulier est null
  if (!spaces[id]) {
    // Remplir l'espace avec ce que vaut le currentPlayer (X ou 0)
    spaces[id] = currentPlayer;

    // Remplir la box (<div></div>) avec X ou O
    e.target.innerText = currentPlayer;

    // Vérifier si un joueur a gagné
    if (playerHasWon()) {
      $heading.innerText = `${currentPlayer} has won`;

      // Stockés le tableau des cases gagnantes dans une variable
      let winningBoxes = playerHasWon();

      // Changer le background des cases gagnantes
      winningBoxes.map((box) => {
        return ($boxes[box].style.backgroundColor = winningIndicator);
      });
    }

    // Alterner les joueurs
    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombinations = [
  // Horizontal combos
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical combos
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal combos
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const alignment of winningCombinations) {
    // Destructurer alignment pour que les valeurs soit stockés dans les variables a, b et c
    let [a, b, c] = alignment;

    // Vérifier s'il y'a un alignement
    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      console.log("We have a winner!");
      return [a, b, c];
    }
  }
  return false;
}

$restartBtn.addEventListener("click", restart);

function restart() {
  // Nettoyer le tableau spaces
  spaces.fill(null);

  $boxes.forEach((box) => {
    // Nettoyer les box (<div></div>)
    box.innerText = "";
    // Réinitialiser le background des cases gagnantes
    box.style.backgroundColor = "";
  });

  $heading.innerText = "Tic Tac Toe";

  // Réinitialiser le currentPlayer
  currentPlayer = X_TEXT;

  // Réinitialiser le background des cases gagnantes
}

startingGame();
