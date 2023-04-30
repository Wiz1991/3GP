import { BaseObjectProps } from '@/types';
import { MeshProps } from '@react-three/fiber';
import React from 'react';

type DebugObjectProps = BaseObjectProps & MeshProps;

export function DebugObject({
    userData,
    draggable,
    ...rest
}: DebugObjectProps) {
    return (
        <mesh position={[0, 0.5, 0]} castShadow {...rest}>
            <boxGeometry args={[2, 1, 2]} />
            <meshStandardMaterial color="#9d4b4b" />
        </mesh>
    );
}
