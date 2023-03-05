import { AssetPicker } from '@/components/AssetPicker';
import { Canvas } from '@react-three/fiber';
import styles from './styles.module.css';
import Scene from '@/components/Designer/Scene';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addObjectToQueue } from '@/store/designer';
import { nanoid } from '@reduxjs/toolkit';
import {
    ContactShadows,
    Environment,
    GizmoHelper,
    GizmoViewport,
    OrbitControls,
    OrthographicCamera,
    Stats,
} from '@react-three/drei';
import { Shadows } from '@/components/Designer/Shadows';

export function Designer() {
    const dispatch = useDispatch();

    const handleAssetDrop = (
        item: { type: string },
        monitor: DropTargetMonitor<{}, {}>
    ): {} | undefined => {
        const offset = monitor.getClientOffset();

        if (!offset) throw new Error('Failed to read offset from drop event. ');

        dispatch(
            addObjectToQueue({
                id: nanoid(2),
                canvasPosition: [offset.x, offset.y],
            })
        );

        return {};
    };

    const [, dropRef] = useDrop<{ type: string }, {}, {}>(
        () => ({
            accept: 'Asset',
            drop: handleAssetDrop,
        }),
        [dispatch]
    );

    return (
        <section className={styles['canvas-renderer']} ref={dropRef}>
            <Canvas shadows camera={{ position: [0, 30, 40], fov: 25 }}>
                <Scene />
                <Environment preset="city" />
                <Shadows />
                <OrthographicCamera />
                <OrbitControls makeDefault />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport
                        axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
                        labelColor="white"
                    />
                </GizmoHelper>
            </Canvas>
            <AssetPicker />
        </section>
    );
}
