import { Center, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { IconType } from 'react-icons';
import { FaAirFreshener, FaBoxes, FaJediOrder } from 'react-icons/fa';
import styles from './styles.module.css';

interface Asset {
    type: string;
    icon: IconType;
    label: string;
}

export function AssetPicker() {
    const assets: Asset[] = [
        {
            icon: FaAirFreshener,
            type: 'Enterprise',
            label: 'Enterprise',
        },
    ];

    return (
        <div className={styles['picker-container']}>
            <button className={styles['picker-container__toggler']}>
                <FaBoxes className={styles.toggler__icon} />
            </button>
            <div className={styles['picker-container__items']}>
                {assets.map((asset) => (
                    // <PickerItem asset={asset} key={asset.label} />
                ))}
            </div>
        </div>
    );
}
