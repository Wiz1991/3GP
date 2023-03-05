import { Shadows } from '@/components/Designer/Shadows';
import { DebugObject } from '@/components/Objects/DebugObject';
import { useRootSelector } from '@/hooks';
import { selectObjectQueue } from '@/store/designer/selectors';
import {
    Environment,
    OrbitControls,
    Grid,
    GridProps,
    OrthographicCamera,
    GizmoHelper,
    GizmoViewport,
    Center,
} from '@react-three/drei';
import { CameraProps, Canvas, RenderProps, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Plane,
    PlaneHelper,
    Raycaster,
    Vector,
    Vector3,
} from 'three';

export default function Scene({ children }: { children?: ReactNode }) {
    const objectCreateQueue = useRootSelector(selectObjectQueue);
    const [pos, setPos] = useState<Vector3>(new Vector3(0, 0.5, 0));
    const floorPlane = new Plane(new Vector3(0, 1, 0));
    const { raycaster, scene, camera } = useThree();

    const gridOptions = useControls({
        cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
        cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
        cellColor: '#6f6f6f',
        sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
        sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
        sectionColor: '#9d4b4b',
        fadeDistance: { value: 250, min: 0, max: 10000, step: 10 },
        fadeStrength: { value: 1, min: 0, max: 10, step: 0.1 },
        followCamera: false,
        infiniteGrid: true,
    });

    useEffect(() => {
        if (!objectCreateQueue.length) return;

        const payload = objectCreateQueue[objectCreateQueue.length - 1];

        if (!payload?.canvasPosition) return;

        const { x, y } = {
            x: (payload.canvasPosition[0] / window.innerWidth) * 2 - 1,
            y: -(payload.canvasPosition[1] / window.innerHeight) * 2 + 1,
        };
        raycaster.setFromCamera({ x, y }, camera);

        console.log(raycaster.intersectObjects(scene.children));
        const intersects = raycaster.ray.intersectPlane(
            floorPlane,
            new Vector3()
        );

        if (intersects) {
            setPos(intersects);
        }
    }, [objectCreateQueue]);

    useEffect(() => {
        console.log(pos);
    }, [pos]);

    return (
        <React.Fragment>
            {/* <DebugObject position={pos} /> */}
            <Grid position={[0, -0.01, 0]} {...gridOptions} />
            {/* <planeHelper args={[floorPlane, 5, 0x0]} visible={false} /> */}
            <Center top position={[-2, 0, 2]}>
                <mesh castShadow>
                    <sphereGeometry args={[0.5, 64, 64]} />
                    <meshStandardMaterial color="#9d4b4b" />
                </mesh>
            </Center>
            
        </React.Fragment>
    );
}
