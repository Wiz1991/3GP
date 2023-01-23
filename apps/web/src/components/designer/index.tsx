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
import { memo, Suspense } from 'react';
import styles from './styles.module.css';
import { useTweaks } from 'use-tweaks';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Designer() {
    const gridOptions: GridProps = useTweaks('Grid', {
        cellSize: 17,
        cellThickness: 1,
        cellColor: '#6f6f6f',
        sectionSize: 80,
        sectionThickness: 1.5,
        sectionColor: '#9d4b4b',
        fadeDistance: 3000,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    });

    return (
        <section className={styles['canvas-renderer']}>
            <Canvas
                shadows
                camera={{ position: [300, 250, 5], fov: 60, far: 3000 }}
            >
                <group position={[0, 0, 0]}>
                    <Factory />
                    <Shadows />
                </group>
                <Environment preset="city" />
                <OrbitControls />
                <Grid
                    infiniteGrid
                    position={[0, -10, 0]}
                    args={[10.5, 10.5]}
                    {...gridOptions}
                />
            </Canvas>
            <Picker />
        </section>
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

const Factory = () => {
    const gltf = useLoader(GLTFLoader, 'http://localhost:3000/scene.gltf');

    return (
        <Suspense fallback={null}>
            <primitive object={gltf.scene} />
        </Suspense>
    );
};
