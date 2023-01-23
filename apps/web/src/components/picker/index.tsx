import { Center, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { IconType } from 'react-icons';
import { FaJediOrder } from 'react-icons/fa';
import styles from './styles.module.css';

interface Asset {
    type: string;
    icon: IconType;
    label: string;
}

export function Picker() {
    const assets: Asset[] = [
        {
            icon: FaJediOrder,
            type: 'Enterprise',
            label: 'Enterprise',
        },
    ];

    return (
        <div className={styles['picker-container']}>
            {assets.map((asset) => (
                <PickerItem asset={asset} key={asset.label} />
            ))}
        </div>
    );
}

const PickerItem = ({ asset }: { asset: Asset }) => {
    const Icon = asset.icon;

    return (
        <div className={styles['picker-container__item']}>
            <Icon size="2rem" />
            <span>{asset.label}</span>
        </div>
    );
};
