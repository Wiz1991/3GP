import { AssetPicker } from '@/components/AssetPicker';
import { Canvas } from '@react-three/fiber';
import styles from './styles.module.css';
import Scene from '@/components/Designer/Scene';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addObjectToQueue } from '@/store/designer';
import { nanoid } from '@reduxjs/toolkit';

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
            <Canvas>
                <Scene />
            </Canvas>
            <AssetPicker />
        </section>
    );
}
