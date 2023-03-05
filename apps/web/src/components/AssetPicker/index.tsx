import { Item } from '@/components/AssetPicker/Item';
import { ToolbarButton } from '@/components/ToolbarButton';
import classNames from 'classnames';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { FaAirFreshener, FaBoxes, FaJediOrder } from 'react-icons/fa';
import styles from './styles.module.css';

export interface Asset {
    type: string;
    icon: IconType;
    label: string;
}

export function AssetPicker() {
    const [expanded, setExpanded] = useState(false);

    const assets: Asset[] = [
        {
            icon: FaAirFreshener,
            type: 'Enterprise',
            label: 'Enterprise',
        },
    ];

    return (
        <div className={styles['picker-container']}>
            <ToolbarButton
                onClick={() => setExpanded(!expanded)}
                className={styles.toggler}
            >
                <FaBoxes className={styles.toggler__icon} />
            </ToolbarButton>
            <div className={styles['picker-container__assets']}>
                {assets.map((asset) => (
                    <Item asset={asset}></Item>
                ))}
            </div>
        </div>
    );
}
