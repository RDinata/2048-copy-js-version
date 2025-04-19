// modules/gridFunctions.js
import { grid } from "./domElements.js";

const row = 4;
const columns = 4;

export const createGrid = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < columns; j++) {
      const boxDiv = document.createElement("div");
      boxDiv.classList.add("box");
      boxDiv.setAttribute("data-position", `${i}_${j}`);
      grid.appendChild(boxDiv);
    }
  }
};
