import { Picker } from '@/components/picker';
import {
    AccumulativeShadows,
    Center,
    Grid,
    GridProps,
    OrbitControls,
    RandomizedLight,
    Environment,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { memo } from 'react';
import styles from './styles.module.css';
import { useTweaks } from 'use-tweaks';

export function Designer() {
    const gridOptions: GridProps = useTweaks('Grid', {
        cellSize: 0.6,
        cellThickness: 1,
        cellColor: '#6f6f6f',
        sectionSize: 3.3,
        sectionThickness: 1.5,
        sectionColor: '#9d4b4b',
        fadeDistance: 40,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    });

    return (
        <Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>
            <Picker />
            <group position={[0, -0.5, 0]}>
                <Center top position={[-2, 0, 2]}>
                    <mesh castShadow>
                        <sphereGeometry args={[0.5, 64, 64]} />
                        <meshStandardMaterial color="#9d4b4b" />
                    </mesh>
                </Center>
                <Shadows />
                <Grid
                    infiniteGrid
                    position={[0, -0.01, 0]}
                    args={[10.5, 10.5]}
                    {...gridOptions}
                />
            </group>
            <Environment preset="city" />
            <OrbitControls />
        </Canvas>
    );
}

const Shadows = memo(() => (
    <AccumulativeShadows
        temporal
        frames={100}
        color="#9d4b4b"
        colorBlend={0.5}
        alphaTest={0.9}
        scale={20}
    >
        <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
    </AccumulativeShadows>
));
