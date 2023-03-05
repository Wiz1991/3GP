import { DebugObject } from '@/components/Objects/DebugObject';
import { useRootSelector } from '@/hooks';
import { selectObjectQueue } from '@/store/designer/selectors';
import {
    Environment,
    OrbitControls,
    Grid,
    GridProps,
    OrthographicCamera,
} from '@react-three/drei';
import { CameraProps, Canvas, RenderProps, useThree } from '@react-three/fiber';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Plane,
    Raycaster,
    Vector,
    Vector3,
} from 'three';

export default function Scene({ children }: { children?: ReactNode }) {
    const objectCreateQueue = useRootSelector(selectObjectQueue);
    const [pos, setPos] = useState<Vector3>(new Vector3(0, 0, 2));
    const floorPlane = new Plane(new Vector3(0, 1, 0));
    const { raycaster, scene, camera } = useThree();
    let intersectPoint = new Vector3();

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
            <DebugObject position={pos} />
            <Grid infiniteGrid position={[1, 0, 0]} />
            <planeHelper args={[floorPlane, 5, 0x0]} visible={false} j/>
            <OrbitControls />
            <OrthographicCamera position={[1, 2, 2]} />
        </React.Fragment>
    );
}
