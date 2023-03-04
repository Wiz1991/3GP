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
        <mesh position={[0, 0, 0]} {...rest}>
            <boxGeometry args={[80, 80, 80]} />
            <meshBasicMaterial color={0x00ff00} wireframe />
        </mesh>
    );
}
