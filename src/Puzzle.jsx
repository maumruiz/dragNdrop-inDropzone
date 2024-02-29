import { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import DragControls from "./DragControls";

import { useSnapshot } from "valtio";
import { puzzleState } from "./store";
import { DoubleSide, Vector3 } from "three";

export function Piece({ geometry, material, position, rotation, pieceKey }) {
  const groupRef = useRef();
  const meshRef = useRef();

  const dragStart = () => {
    puzzleState.isDragging = true;
    puzzleState.initialPosition = groupRef.current.children[0].position.clone();
    console.log(meshRef.current);
  };

  const dragEnd = () => {
    puzzleState.isDragging = false;

    if (puzzleState.isHovering) {
      if (puzzleState.hoveredPiece === pieceKey) {
        meshRef.current.position.copy(new Vector3());
      }

      groupRef.current.updateMatrix();
    }
  };

  return (
    <DragControls ref={groupRef} onDragStart={dragStart} onDragEnd={dragEnd}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
      />
    </DragControls>
  );
}

function DropZone({ geometry, rotation, pieceKey }) {
  const [hover, setHover] = useState(false);
  const snap = useSnapshot(puzzleState);
  const meshRef = useRef();

  const onDropZoneHover = () => {
    setHover(true);
    puzzleState.isHovering = true;

    meshRef.current.geometry.computeBoundingBox();
    let center = new Vector3();
    meshRef.current.geometry.boundingBox.getCenter(center);
    console.log(center);
    puzzleState.hoveringPos = center;

    puzzleState.hoveredPiece = pieceKey;
  };

  const onDropZoneUnhover = () => {
    setHover(false);
    puzzleState.isHovering = false;
    puzzleState.hoveringPos = null;
    puzzleState.hoveredPiece = null;
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={onDropZoneHover}
      onPointerOut={onDropZoneUnhover}
      castShadow
      receiveShadow
      geometry={geometry}
      rotation={rotation}
    >
      <meshBasicMaterial
        color={"white"}
        side={DoubleSide}
        opacity={hover ? 0.6 : snap.isDragging ? 0.3 : 0.1}
        transparent
      />
    </mesh>
  );
}

export function Pieces({ nodes, materials, rotation = [0, 0, 0] }) {
  return (
    <>
      <Piece
        geometry={nodes.topleft.geometry}
        material={materials.puzzle}
        position={[-1.7, 0.8, 0]}
        rotation={rotation}
        pieceKey={"topleft"}
      />
      <Piece
        geometry={nodes.topmid.geometry}
        material={materials.puzzle}
        position={[2.1, 1.8, 0]}
        rotation={rotation}
        pieceKey={"topmid"}
      />
      <Piece
        geometry={nodes.topright.geometry}
        material={materials.puzzle}
        position={[-1.9, 1.5, 0]}
        rotation={rotation}
        pieceKey={"topright"}
      />
      <Piece
        geometry={nodes.midleft.geometry}
        material={materials.puzzle}
        position={[-1.2, 0.2, 0]}
        rotation={rotation}
        pieceKey={"midleft"}
      />
      <Piece
        geometry={nodes.midmid.geometry}
        material={materials.puzzle}
        position={[-2.8, -1.5, 0]}
        rotation={rotation}
        pieceKey={"midmid"}
      />
      <Piece
        geometry={nodes.midright.geometry}
        material={materials.puzzle}
        position={[1.7, 0.9, 0]}
        rotation={rotation}
        pieceKey={"midright"}
      />
      <Piece
        geometry={nodes.bottomleft.geometry}
        material={materials.puzzle}
        position={[-0.8, -2, 0]}
        rotation={rotation}
        pieceKey={"bottomleft"}
      />
      <Piece
        geometry={nodes.bottommid.geometry}
        material={materials.puzzle}
        position={[-0.2, -1.6, 0]}
        rotation={rotation}
        pieceKey={"bottommid"}
      />
      <Piece
        geometry={nodes.bottomright.geometry}
        material={materials.puzzle}
        position={[0.8, -1.7, 0]}
        rotation={rotation}
        pieceKey={"bottomright"}
      />
    </>
  );
}

function DropZones({ nodes, rotation = [0, 0, 0] }) {
  return (
    <>
      <DropZone
        geometry={nodes.topleft_dz.geometry}
        rotation={rotation}
        pieceKey={"topleft"}
      />
      <DropZone
        geometry={nodes.topmid_dz.geometry}
        rotation={rotation}
        pieceKey={"topmid"}
      />
      <DropZone
        geometry={nodes.topright_dz.geometry}
        rotation={rotation}
        pieceKey={"topright"}
      />
      <DropZone
        geometry={nodes.midleft_dz.geometry}
        rotation={rotation}
        pieceKey={"midleft"}
      />
      <DropZone
        geometry={nodes.midmid_dz.geometry}
        rotation={rotation}
        pieceKey={"midmid"}
      />
      <DropZone
        geometry={nodes.midright_dz.geometry}
        rotation={rotation}
        pieceKey={"midright"}
      />
      <DropZone
        geometry={nodes.bottomleft_dz.geometry}
        rotation={rotation}
        pieceKey={"bottomleft"}
      />
      <DropZone
        geometry={nodes.bottommid_dz.geometry}
        rotation={rotation}
        pieceKey={"bottommid"}
      />
      <DropZone
        geometry={nodes.bottomright_dz.geometry}
        rotation={rotation}
        pieceKey={"bottomright"}
      />
    </>
  );
}

export function Puzzle(props) {
  const { nodes, materials } = useGLTF("/puzzle.glb");
  return (
    <group {...props} dispose={null}>
      <Pieces
        nodes={nodes}
        materials={materials}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <DropZones nodes={nodes} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

useGLTF.preload("/puzzle.glb");
