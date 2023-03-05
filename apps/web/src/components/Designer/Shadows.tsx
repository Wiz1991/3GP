import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { memo } from 'react';

export const Shadows = memo(() => (
    <AccumulativeShadows
        frames={100}
        color="#9d4b4b"
        colorBlend={0.6}
        alphaTest={0.9}
        scale={20}
    >
        <RandomizedLight amount={9} radius={5} position={[5, 5, -10]} />
    </AccumulativeShadows>
));
