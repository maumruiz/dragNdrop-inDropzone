import { Canvas } from "@react-three/fiber";
import Basic from "./Basic";
import { Puzzle } from "./Puzzle";
import { OrbitControls } from "@react-three/drei";

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

      <Basic />
      {/* <Puzzle /> */}

      {/* <OrbitControls makeDefault /> */}
    </Canvas>
  );
}

export default App;
