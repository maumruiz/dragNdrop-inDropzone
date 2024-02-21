import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { DragControls } from "./DragControls";
import { useSnapshot } from "valtio";
import appState from "./store";

function Box(props) {
  const groupRef = useRef();

  const dragStart = (initialModelPosition) => {
    appState.isDragging = true;
    appState.initialPosition = initialModelPosition;
    console.log("dragStart", appState.initialPosition);
  };

  const dragEnd = () => {
    appState.isDragging = false;
    console.log(groupRef);

    if (!appState.isHovering) {
      groupRef.current.matrix.setPosition(appState.initialPosition);
    }

    console.log("dragEnd", appState.isHovering, appState.initialPosition);
  };

  return (
    <DragControls ref={groupRef} onDragStart={dragStart} onDragEnd={dragEnd}>
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={props.color || "orange"} />
      </mesh>
    </DragControls>
  );
}

function DropZone(props) {
  const snap = useSnapshot(appState);

  return (
    <mesh
      {...props}
      onPointerOver={() => (appState.isHovering = true)}
      onPointerOut={() => (appState.isHovering = false)}
    >
      <boxGeometry args={[1.5, 2, 0.1]} />
      <meshBasicMaterial
        color={snap.isHovering ? "lightgreen" : "lightblue"}
        opacity={snap.isDragging ? 0.5 : 0.1}
        transparent
      />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <DropZone position={[-3, 0, -1]} />
      <DropZone position={[0, 0, -1]} />
      <DropZone position={[3, 0, -1]} />

      <Box position={[-3, -2.5, 0]} color={"orange"} />
      <Box position={[0, -2.5, 0]} color={"crimson"} />
      <Box position={[3, -2.5, 0]} color={"lightgreen"} />
    </Canvas>
  );
}

export default App;
