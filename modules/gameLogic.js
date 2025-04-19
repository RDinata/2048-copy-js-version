// modules/gameLogic.js
import {
  container,
  coverScreen,
  grid,
  overText,
  result,
  scoreDisplay,
  startButton, // Import startButton here
} from "./domElements.js";
import { createGrid } from "./gridFunctions.js";
import { randomPosition } from "./utils.js";

const row = 4;
const columns = 4;
let matrix;
let score;

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

const updateGridDisplay = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < columns; j++) {
      const element = document.querySelector(`[data-position='${i}_${j}']`);
      element.innerHTML = matrix[i][j] ? matrix[i][j] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[i][j]}`);
    }
  }
  scoreDisplay.innerText = score;
};

const generateTwo = () => {
  if (hasEmptyBox()) {
    const randomRow = randomPosition(matrix);
    const randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] === 0) {
      matrix[randomRow][randomCol] = 2;
      updateGridDisplay();
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
      updateGridDisplay();
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

export const slideDown = () => {
  for (let i = 0; i < columns; i++) {
    let num = [];
    for (let j = 0; j < row; j++) {
      num.push(matrix[j][i]);
    }
    num = checker(num, true);
    for (let j = 0; j < row; j++) {
      matrix[j][i] = num[j];
    }
  }
  updateGridDisplay();
  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

export const slideUp = () => {
  for (let i = 0; i < columns; i++) {
    let num = [];
    for (let j = 0; j < row; j++) {
      num.push(matrix[j][i]);
    }
    num = checker(num);
    for (let j = 0; j < row; j++) {
      matrix[j][i] = num[j];
    }
  }
  updateGridDisplay();
  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

export const slideRight = () => {
  for (let i = 0; i < row; i++) {
    let num = [];
    for (let j = 0; j < columns; j++) {
      num.push(matrix[i][j]);
    }
    num = checker(num, true);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = num[j];
    }
  }
  updateGridDisplay();
  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

export const slideLeft = () => {
  for (let i = 0; i < row; i++) {
    let num = [];
    for (let j = 0; j < columns; j++) {
      num.push(matrix[i][j]);
    }

    num = checker(num);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = num[j];
    }
  }
  updateGridDisplay();
  const decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

export const startGame = () => {
  score = 0;
  scoreDisplay.innerText = score;
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
