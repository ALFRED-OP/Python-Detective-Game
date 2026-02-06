import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Grid } from '@react-three/drei';
import { useRef } from 'react';

const FloatingObject = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(time / 2);
        meshRef.current.rotation.y = Math.sin(time / 3);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#b026ff"
                    wireframe
                    transparent
                    opacity={0.3}
                    emissive="#b026ff"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
}

const DashboardScene = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                <FloatingObject />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Grid
                    position={[0, -2, 0]}
                    args={[10, 10]}
                    cellSize={0.5}
                    cellThickness={0.5}
                    cellColor="#2d2d2d"
                    sectionSize={3}
                    sectionThickness={1}
                    sectionColor="#b026ff"
                    fadeDistance={30}
                />
            </Canvas>
        </div>
    );
};

export default DashboardScene;
