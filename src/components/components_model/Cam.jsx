import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import React from "react";

const Cam = () => {
    return (
        <PerspectiveCamera
            makeDefault
            zoom={1.6}
            position={[0, 0, 5]}
        />
    )
}

export default Cam;