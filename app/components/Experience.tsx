'use client'
import { useEffect, useRef } from "react"

import { CameraControls, Environment, Loader } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Leva } from "leva"
import { Avatar } from "./Avatar"
import UI from "./UI"
import { SpeechProvider } from "@/context/SpeechProvider"

const Experience = () => {
    const cameraControls = useRef(null!);
    useEffect(() => {
        if (cameraControls.current) {
            cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
        }
    }, []);
    return (
        <SpeechProvider>
            <Loader />
            <Leva />
            <UI />
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
                {/* <CameraControls ref={cameraControls} /> */}
                <Avatar position={[0, -3, 6]} scale={2} />
                <Environment preset="sunset" />
                <color attach="background" args={["#ececec"]} />
            </Canvas>
        </SpeechProvider>

    )
}

export default Experience