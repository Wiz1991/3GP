import { Picker } from '@/components/Picker';
import {
    AccumulativeShadows,
    Center,
    Grid,
    GridProps,
    OrbitControls,
    RandomizedLight,
    Environment,
    TransformControls,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { memo, Suspense, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useTweaks } from 'use-tweaks';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from '@/components/Designer/Scene';
import { Box } from '@/components/Models/box';
import { Object3D } from 'three';

export function Designer() {
    return (
        <section className={styles['canvas-renderer']}>
            <Scene>
                <Box name="testBox" position={[40, 40, 40]} />
                <Controls />
                <Shadows />
            </Scene>
            <Picker />
        </section>
    );
}

const Controls = () => {
    const [activeObject, setActiveObject] = useState<Object3D | null>();

    useFrame(({ scene }) => {
        const object = scene.getObjectByName('testBox');
        if (object) {
            setActiveObject(object);
        }
    });

    return (
        <>
            {activeObject && (
                <TransformControls
                    mode="translate"
                    translationSnap={40}
                    object={activeObject}
                    showY={false}
                />
            )}

            <OrbitControls makeDefault />
        </>
    );
};

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
