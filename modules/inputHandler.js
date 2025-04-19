// modules/inputHandler.js
import { grid, scoreDisplay } from "./domElements.js";
import { slideDown, slideLeft, slideRight, slideUp } from "./gameLogic.js";

let isSwiped;
let touchY;
let initialY = 0;
let touchX;
let initialX = 0;
let swipeDirection;

const rectLeft = grid.getBoundingClientRect().left;
const rectTop = grid.getBoundingClientRect().top;

const getXY = (e) => {
  touchX = e.touches[0].clientX - rectLeft;
  touchY = e.touches[0].clientY - rectTop;
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
      swipeDirection = diffY > 0 ? "down" : "up";
    } else {
      swipeDirection = diffX > 0 ? "right" : "left";
    }
  }
});

grid.addEventListener("touchend", () => {
  isSwiped = false;
  const swipeCalls = {
    up: slideUp,
    down: slideDown,
    left: slideLeft,
    right: slideRight,
  };
  if (swipeDirection && swipeCalls[swipeDirection]) {
    swipeCalls[swipeDirection]();
  }
  swipeDirection = "";
});
