import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
    const ref = useRef();

    // Generate random points in a sphere-like distribution
    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 10 + Math.random() * 15;

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.05;
        ref.current.rotation.z = t * 0.02;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#b026ff"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
};

const CyberGrid = () => {
    const gridRef = useRef();

    useFrame((state) => {
        gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 2;
    });

    return (
        <group ref={gridRef}>
            <gridHelper
                args={[100, 50, "#00f3ff", "#121212"]}
                rotation={[Math.PI / 2.1, 0, 0]}
                position={[0, -5, 0]}
            />
        </group>
    );
};

const HeroCanvas = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-noir-950">
            <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 10, 30]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#b026ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f3ff" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ParticleField />
                </Float>

                <CyberGrid />
            </Canvas>

            {/* Gradient Overlay for Fade Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-noir-950/20 to-noir-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-60" />
        </div>
    );
};

export default HeroCanvas;
