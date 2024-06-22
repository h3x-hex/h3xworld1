"use client"

import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Navbar } from 'components/Navbar';

export default function Page () {

    function Floor(props: any) {
        return (
          <mesh {...props} recieveShadow>
            <boxGeometry args={[8,8,8]} />
            <meshPhysicalMaterial color='white' />
          </mesh>
        );
      }

    return (

        <>
        <Navbar/>
        <div className="h-screen">
            <Canvas  
                shadows
                camera={{position: [10, -10, 7]}}
            >
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                <Floor/>

            </Canvas>
        </div>
        </>

    )


}