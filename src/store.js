import { proxy } from "valtio";

const appState = proxy({
  isHovering: false,
  isDragging: false,
  initialPosition: null,
  hoveringPos: null,
});

export const puzzleState = proxy({
  isDragging: false,
  initialPosition: null,
  isHovering: false,
  hoveringPos: null,
  hoveredPiece: null,
});

export default appState;
