"use client"

import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Navbar } from 'components/Navbar';
import { OrbitControls } from '@react-three/drei'
import { h3xHouse } from 'components/h3xHouse';

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
                <OrbitControls />

                <Floor />

            </ Canvas>
        </div>
        </>

    )


}