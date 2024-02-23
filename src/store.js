import { proxy } from "valtio";

const appState = proxy({
  isHovering: false,
  isDragging: false,
  initialPosition: null,
  hoveringPos: null,
});

export default appState;
