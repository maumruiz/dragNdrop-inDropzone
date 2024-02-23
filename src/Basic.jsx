import { useRef } from "react";
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
    if (appState.isHovering) {
      groupRef.current.children[0].position.copy(appState.hoveringPos);
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

function DropZone(props) {
  const snap = useSnapshot(appState);
  const meshRef = useRef();

  const onDropZoneHover = () => {
    appState.isHovering = true;

    meshRef.current.geometry.computeBoundingBox();
    let center = new Vector3();
    meshRef.current.geometry.boundingBox.getCenter(center);
    meshRef.current.localToWorld(center);

    appState.hoveringPos = center;
  };

  const onDropZoneUnhover = () => {
    appState.isHovering = false;
    appState.hoveringPos = null;
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
        color={snap.isHovering ? "lightgreen" : "lightblue"}
        opacity={snap.isDragging ? 0.5 : 0.1}
        transparent
      />
    </mesh>
  );
}

export default function Basic() {
  return (
    <>
      <DropZone position={[-3, 0, -1]} />
      <DropZone position={[0, 0, -1]} />
      <DropZone position={[3, 0, -1]} />

      <Box position={[-3, -2.5, 0]} color={"orange"} />
      <Box position={[0, -2.5, 0]} color={"crimson"} />
      <Box position={[3, -2.5, 0]} color={"lightgreen"} />
    </>
  );
}
