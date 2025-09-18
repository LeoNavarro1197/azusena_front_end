import React from "react";

const Luces = () => {
    return (
        <>
            <directionalLight color="white" position={[3, 2, 2]} intensity={5}/>
            <directionalLight color="white" position={[-5, 2, 2]} intensity={1}/>
            <ambientLight color={"#ffffff"} intensity={1} />
        </>
    )
}

export default Luces;