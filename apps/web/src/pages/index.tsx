import { Canvas } from '@react-three/fiber';
import { Button } from 'ui';

export default function Web() {
    return (
        <div className="canvas-container">
            <Canvas children={undefined}></Canvas>
        </div>
    );
}
