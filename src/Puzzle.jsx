import { useGLTF } from "@react-three/drei";
import DragControls from "./DragControls";

export function Pieces({ nodes, materials, rotation = [0, 0, 0] }) {
  return (
    <>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.topleft.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[-1.7, 0.8, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.topmid.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[2.1, 1.8, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.topright.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[-1.9, 1.5, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.midleft.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[-1.2, 0.2, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.midmid.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[-2.8, -1.5, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.midright.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[1.7, 0.9, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottomleft.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[-0.8, -2, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottommid.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[-0.2, -1.6, 0]}
        />
      </DragControls>
      <DragControls>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottomright.geometry}
          material={materials.puzzle}
          rotation={rotation}
          position={[0.8, -1.7, 0]}
        />
      </DragControls>
    </>
  );
}

function DropZones({ nodes, materials, rotation = [0, 0, 0] }) {
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topleft_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topmid_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topright_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.midleft_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.midmid_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.midright_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomleft_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottommid_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomright_dz.geometry}
        material={materials.lambert1}
        rotation={rotation}
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
      <DropZones
        nodes={nodes}
        materials={materials}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/puzzle.glb");
