import { proxy } from "valtio";

const appState = proxy({
  isHovering: false,
  isDragging: false,
  initialPosition: null,
  hoveringPos: null,
  hoveredKey: null,
  dropzonesUsed: [false, false, false],
});

export const puzzleState = proxy({
  isDragging: false,
  initialPosition: null,
  isHovering: false,
  hoveringPos: null,
  hoveredPiece: null,
});

export default appState;
