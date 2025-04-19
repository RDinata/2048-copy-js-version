const grid = document.querySelector(".grid");
const startButton = document.getElementById("start-button");
const container = document.querySelector(".container");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const overText = document.getElementById("over-text");

let matrix;
let score;
let isSwiped;
let touchY;
let initialY = 0;
let touchX;
let initialX = 0;
const row = 4;
const columns = 4;
let swipeDirection;

const rectLeft = grid.getBoundingClientRect().left;
const rectTop = grid.getBoundingClientRect().top;

const getXY = (e) => {
  touchX = e.touches[0].clientX - rectLeft;
  touchY = e.touches[0].clientY - rectTop;
};

const createGrid = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < columns; j++) {
      const boxDiv = document.createElement("div");
      boxDiv.classList.add("box");
      boxDiv.setAttribute("data-position", `${i}_${j}`);
      grid.appendChild(boxDiv);
    }
  }
};

const adjacentCheck = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      return true;
    }
  }
  return false;
};

const possibleMovesCheck = () => {
  for (const i in matrix) {
    if (adjacentCheck(matrix[i])) {
      return true;
    }
    const colarr = [];
    for (let j = 0; j < columns; j++) {
      colarr.push(matrix[i][j]);
    }
    if (adjacentCheck(colarr)) {
      return true;
    }
  }
  return false;
};

const randomPosition = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const hasEmptyBox = () => {
  for (const r in matrix) {
    for (const c in matrix[r]) {
      if (matrix[r][c] === 0) {
        return true;
      }
    }
  }
  return false;
};

const gameOverCheck = () => {
  if (!possibleMovesCheck()) {
    coverScreen.classList.remove("hide");
    container.classList.add("hide");
    overText.classList.remove("hide");
    result.innerText = `Final score: ${score}`;
    startButton.innerText = "Restart Game";
  }
};

const generateTwo = () => {
  if (hasEmptyBox()) {
    const randomRow = randomPosition(matrix);
    const randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] === 0) {
      matrix[randomRow][randomCol] = 2;
      const element = document.querySelector(
        `[data-position='${randomRow}_${randomCol}']`,
      );
      element.innerHTML = 2;
      element.classList.add("box-2");
    } else {
      generateTwo();
    }
  } else {
    gameOverCheck();
  }
};

const generateFour = () => {
  if (hasEmptyBox()) {
    const randomRow = randomPosition(matrix);
    const randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] === 0) {
      matrix[randomRow][randomCol] = 4;
      const element = document.querySelector(
        `[data-position='${randomRow}_${randomCol}']`,
      );
      element.innerHTML = 4;
      element.classList.add("box-4");
    } else {
      generateFour();
    }
  } else {
    gameOverCheck();
  }
};

const removeZero = (arr) => arr.filter((num) => num);
const checker = (arr, reverseArr = false) => {
  arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] += arr[i + 1];
      arr[i + 1] = 0;
      score += arr[i];
    }
  }

  arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);

  let missingCount = 4 - arr.length;
  while (missingCount > 0) {
    if (reverseArr) {
      arr.unshift(0);
    } else {
      arr.push(0);
    }
    missingCount -= 1;
  }
  return arr;
};

const slideDown = () => {
  for (let i = 0; i < columns; i++) {
    let num = [];
    for (let j = 0; j < row; j++) {
      num.push(matrix[j][i]);
    }
    num = checker(num, true);
    for (let j = 0; j < row; j++) {
      matrix[j][i] = num[j];
      const element = document.querySelector(`[data-position='${j}_${i}']`);
      element.innerHTML = matrix[j][i] ? matrix[j][i] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[j][i]}`);
    }
  }

  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

const slideUp = () => {
  for (let i = 0; i < columns; i++) {
    let num = [];
    for (let j = 0; j < row; j++) {
      num.push(matrix[j][i]);
    }
    num = checker(num);
    for (let j = 0; j < row; j++) {
      matrix[j][i] = num[j];
      const element = document.querySelector(`[data-position='${j}_${i}']`);
      element.innerHTML = matrix[j][i] ? matrix[j][i] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[j][i]}`);
    }
  }
  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

const slideRight = () => {
  for (let i = 0; i < row; i++) {
    let num = [];
    for (let j = 0; j < columns; j++) {
      num.push(matrix[i][j]);
    }
    num = checker(num, true);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = num[j];
      const element = document.querySelector(`[data-position='${i}_${j}']`);
      element.innerHTML = matrix[i][j] ? matrix[i][j] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[i][j]}`);
    }
  }
  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

const slideLeft = () => {
  for (let i = 0; i < row; i++) {
    let num = [];
    for (let j = 0; j < columns; j++) {
      num.push(matrix[i][j]);
    }

    num = checker(num);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = num[j];
      const element = document.querySelector(`[data-position='${i}_${j}']`);
      element.innerHTML = matrix[i][j] ? matrix[i][j] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[i][j]}`);
    }
  }
  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") {
    slideLeft();
  } else if (e.code === "ArrowRight") {
    slideRight();
  } else if (e.code === "ArrowUp") {
    slideUp();
  } else if (e.code === "ArrowDown") {
    slideDown();
  }
  document.getElementById("score").innerText = score;
});

grid.addEventListener("touchstart", (event) => {
  isSwiped = true;
  getXY(event);
  initialX = touchX;
  initialY = touchY;
});

grid.addEventListener("touchmove", (event) => {
  if (isSwiped) {
    getXY(event);
    const diffX = touchX - initialX;
    const diffY = touchY - initialY;
    if (Math.abs(diffY) > Math.abs(diffX)) {
      swipeDirection = diffX > 0 ? "down" : "up";
    } else {
      swipeDirection = diffX > 0 ? "right" : "left";
    }
  }
});

grid.addEventListener("touchend", (event) => {
  isSwiped = false;
  const swipeCalls = {
    up: slideUp,
    down: slideDown,
    left: slideLeft,
    right: slideRight,
  };
  swipeCalls[swipeDirection]();
  document.getElementById("score").innerText = score;
});

const startGame = () => {
  score = 0;
  document.getElementById("score").innerText = score;
  grid.innerHTML = "";
  matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  createGrid();
  generateTwo();
  generateTwo();
};

startButton.addEventListener("click", () => {
  startGame();
  swipeDirection = "";
});
