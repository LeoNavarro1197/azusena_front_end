import { Canvas } from "@react-three/fiber";
import Cam from "./components_model/Cam";
import Luces from "./components_model/Luces";
import { Model } from "./components_model/Model";
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";

function Render({ isSpeaking }) {
  return (
    <div className="Container" style={{ width: "100%", height: "80vh" }}>
      <Canvas>
        <Cam />
        <Luces />
        <Model isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}

  
  export default Render;