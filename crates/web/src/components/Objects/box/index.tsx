import { MeshProps } from '@react-three/fiber';

export function Box(props: MeshProps) {
    return (
        <mesh position={[0, 0, 0]} {...props}>
            <boxGeometry args={[80, 80, 80]} />
            <meshBasicMaterial color={0x00ff00} wireframe />
        </mesh>
    );
}
