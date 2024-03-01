import { useRef, useState } from "react";
import { DragControls } from "./DragControls";
import { useSnapshot } from "valtio";
import appState from "./store";
import { Vector3 } from "three";

function Box(props) {
  const groupRef = useRef();

  const dragStart = () => {
    appState.isDragging = true;
    appState.initialPosition = groupRef.current.children[0].position.clone();
    console.log("dragStart", appState.initialPosition);
  };

  const dragEnd = () => {
    appState.isDragging = false;

    // Update position from mesh inside drag controls
    const basePosition = groupRef.current.children[0].position.clone();
    const offsetPosition = new Vector3().setFromMatrixPosition(
      groupRef.current.matrix.clone()
    );
    groupRef.current.updateMatrix();
    groupRef.current.children[0].position.copy(
      basePosition.add(offsetPosition)
    );

    // Calculate correct position
    if (
      appState.isHovering &&
      appState.dropzonesUsed[appState.hoveredKey] === false
    ) {
      groupRef.current.children[0].position.copy(appState.hoveringPos);
      appState.dropzonesUsed[appState.hoveredKey] = true;
    } else {
      groupRef.current.children[0].position.copy(appState.initialPosition);
    }

    console.log(
      "dragEnd",
      groupRef,
      appState.isHovering,
      appState.initialPosition
    );
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

function DropZone({ dzKey, ...props }) {
  const snap = useSnapshot(appState);
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  const onDropZoneHover = () => {
    setHovered(true);
    appState.isHovering = true;

    meshRef.current.geometry.computeBoundingBox();
    let center = new Vector3();
    meshRef.current.geometry.boundingBox.getCenter(center);
    meshRef.current.localToWorld(center);

    appState.hoveringPos = center;
    appState.hoveredKey = dzKey;
  };

  const onDropZoneUnhover = () => {
    setHovered(false);
    appState.isHovering = false;
    appState.hoveringPos = null;
    appState.hoveredKey = null;
  };

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={onDropZoneHover}
      onPointerOut={onDropZoneUnhover}
    >
      <boxGeometry args={[1.5, 2, 0.1]} />
      <meshBasicMaterial
        color={hovered ? "lightgreen" : "lightblue"}
        opacity={hovered ? 0.6 : snap.isDragging ? 0.3 : 0.1}
        transparent
      />
    </mesh>
  );
}

export default function Basic() {
  return (
    <>
      <DropZone position={[-3, 0, -1]} dzKey={0} />
      <DropZone position={[0, 0, -1]} dzKey={1} />
      <DropZone position={[3, 0, -1]} dzKey={2} />

      <Box position={[-3, -2.5, 0]} color={"orange"} />
      <Box position={[0, -2.5, 0]} color={"crimson"} />
      <Box position={[3, -2.5, 0]} color={"lightgreen"} />
    </>
  );
}
