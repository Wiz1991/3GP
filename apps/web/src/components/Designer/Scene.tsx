import { Environment, OrbitControls, Grid, GridProps } from '@react-three/drei';
import { CameraProps, Canvas, RenderProps } from '@react-three/fiber';
import { ReactNode } from 'react';

export default function Scene({ children }: { children: ReactNode }) {
    const gridOptions: GridProps = {
        cellSize: 80,
        cellThickness: 0,
        cellColor: '#6f6f6f',
        sectionSize: 80,
        sectionThickness: 1.5,
        sectionColor: '#9d4b4b',
        fadeDistance: 3000,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    };

    return (
        <Canvas
            shadows
            camera={{ position: [300, 250, 5], fov: 60, far: 5000 }}
        >
            {children}
            <Environment preset="city" />
            <Grid infiniteGrid position={[0, 0, 0]} {...gridOptions} />
        </Canvas>
    );
}
