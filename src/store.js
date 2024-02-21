import { proxy } from "valtio";

const appState = proxy({
  isHovering: false,
  isDragging: false,
  initialPosition: null,
});

export default appState;
