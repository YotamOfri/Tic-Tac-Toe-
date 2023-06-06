// Html Var
const sidebar_toogle_btn = document.querySelector(".icon");
const board = document.querySelector(".board").querySelectorAll("button");
const board_container = document.querySelector(".board");
const result_X = document.querySelector(".turn-text-result-X");
const result_O = document.querySelector(".turn-text-result-O");
const restart_game_button = document.querySelector(".restart-game-btn");
const rest_score_button = document.querySelector(".rest-score-btn");
// Game Var
var playerturn = 0;
let gameboard = ["", "", "", "", "", "", "", "", ""];
board.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (playerturn % 2 === 0 || playerturn === 0) {
      gameboard[btn.className.slice(btn.className.length - 1) - 1] = "X";
      // Switching The Animation X => O :CSS
      document.querySelector(".one").classList.remove("active-X");
      document.querySelector(".two").classList.add("active-O");
    } else {
      gameboard[btn.className.slice(btn.className.length - 1) - 1] = "O";
      // Switching The Animation O => X :CSS
      document.querySelector(".two").classList.remove("active-O");
      document.querySelector(".one").classList.add("active-X");
    }
    playerturn++;
    Displayboard();
    btn.disabled = true;
  });
});
restart_game_button.addEventListener("click", () => {
  restboard();
});
rest_score_button.addEventListener("click", () => {
  result_O.innerText = "-";
  result_X.innerText = "-";
});
function Displayboard() {
  gameboard.forEach((player, index) => {
    if (player === "X")
      board[index].firstElementChild.classList.add("btn-content-x");
    if (player === "O")
      board[index].firstElementChild.classList.add("btn-content-o");
    if (player === "") {
      if (board[index].firstElementChild.classList.contains("btn-content-x"))
        board[index].firstElementChild.classList.remove("btn-content-x");
      if (board[index].firstElementChild.classList.contains("btn-content-o"))
        board[index].firstElementChild.classList.remove("btn-content-o");
      board[index].disabled = false;
    }
  });
  if (checkforwinner() != undefined) {
    const winnerpage = document.createElement("div");
    winnerpage.classList.add("myelement");
    const winner = document.createElement("p");
    const text = document.createElement("h3");
    text.innerText = "Won";
    if (checkforwinner() === "X") {
      result_X.innerText =
        result_X.innerText !== "-" ? parseInt(result_X.innerText) + 1 : 1;
      winner.classList.add("btn-content-x");
    }
    if (checkforwinner() === "O") {
      result_O.innerText =
        result_O.innerText !== "-" ? parseInt(result_O.innerText) + 1 : 1;
      winner.classList.add("btn-content-o");
      winner.style.backgroundColor = "transparent";
      winner.style.width = "150px";
    }
    winnerpage.appendChild(winner);
    winnerpage.appendChild(text);
    winnerpage.addEventListener("click", () => {
      restboard();
      winnerpage.remove();
    });
    board_container.appendChild(winnerpage);
  }
  if (checkfordraw()) {
    const winnerpage = document.createElement("div");
    winnerpage.classList.add("myelement");
    const text = document.createElement("h3");
    text.innerText = "Draw";
    winnerpage.appendChild(text);
    winnerpage.addEventListener("click", () => {
      restboard();
      winnerpage.remove();
    });
    board_container.appendChild(winnerpage);
    document.querySelectorAll(".line").forEach((line) => {
      line.remove();
    });
  }
}
function restboard() {
  gameboard = ["", "", "", "", "", "", "", "", ""];
  playerturn = 0;
  document.querySelectorAll(".line").forEach((line) => {
    line.remove();
  });
  if (board_container.querySelector(".myelement"))
    board_container.querySelector(".myelement").remove();
  changeside();
  Displayboard();
}
function changeside() {
  if (playerturn % 2 === 0 || playerturn === 0) {
    // Switching The Animation X => O :CSS
    document.querySelector(".two").classList.remove("active-O");
    document.querySelector(".one").classList.add("active-X");
  } else {
    // Switching The Animation O => X :CSS
    document.querySelector(".one").classList.remove("active-X");
    document.querySelector(".two").classList.add("active-O");
  }
}
function createLine(deg, top, left, animate) {
  const line = document.createElement("div");
  line.classList.add("line");
  line.style.top = `${top}px`;
  line.style.left = `${left}px`;
  line.style.transform = `rotate(${deg}deg)`;
  line.style.animation = animate;
  board_container.appendChild(line);
}
function checkforwinner() {
  // Check Rows
  if (
    gameboard[0] === gameboard[1] &&
    gameboard[0] === gameboard[2] &&
    gameboard[0] != ""
  ) {
    createLine(0, 75, 55, "line_move 1s forwards");
    return gameboard[0];
  }
  if (
    gameboard[3] === gameboard[4] &&
    gameboard[3] === gameboard[5] &&
    gameboard[3] != ""
  ) {
    createLine(0, 245, 55, "line_move 1s forwards");
    return gameboard[3];
  }
  if (
    gameboard[6] === gameboard[7] &&
    gameboard[6] === gameboard[8] &&
    gameboard[6] != ""
  ) {
    createLine(0, 415, 55, "line_move 1s forwards");
    return gameboard[6];
  }
  // Check Colunms
  if (
    gameboard[0] === gameboard[3] &&
    gameboard[0] === gameboard[6] &&
    gameboard[0] != ""
  ) {
    createLine(90, 75, 55, "line_move 1s forwards");
    return gameboard[0];
  }
  if (
    gameboard[1] === gameboard[4] &&
    gameboard[1] === gameboard[7] &&
    gameboard[1] != ""
  ) {
    createLine(90, 75, 225, "line_move 1s forwards");
    return gameboard[1];
  }
  if (
    gameboard[2] === gameboard[5] &&
    gameboard[2] === gameboard[8] &&
    gameboard[2] != ""
  ) {
    createLine(90, 75, 395, "line_move 1s forwards");
    return gameboard[2];
  }
  // CrossSides
  if (
    gameboard[0] === gameboard[4] &&
    gameboard[0] === gameboard[8] &&
    gameboard[0] != ""
  ) {
    createLine(45, 75, 55, "line_move_width_high 1s forwards");
    return gameboard[0];
  }
  if (
    gameboard[2] === gameboard[4] &&
    gameboard[2] === gameboard[6] &&
    gameboard[2] != ""
  ) {
    createLine(135, 75, 395, "line_move_width_high 1s forwards");
    return gameboard[2];
  }
}
function checkfordraw() {
  if (checkforwinner() === undefined && !gameboard.includes("")) {
    return true;
  } else false;
}
