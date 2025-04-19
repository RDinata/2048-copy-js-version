// main.js
import { startButton } from "./modules/domElements.js";
import { startGame } from "./modules/gameLogic.js";
import "./modules/gridFunctions.js"; // Import to ensure createGrid runs if needed independently
import "./modules/inputHandler.js"; // Import to initialize event listeners

startButton.addEventListener("click", () => {
  startGame();
});
