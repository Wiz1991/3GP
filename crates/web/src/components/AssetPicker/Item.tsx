import { Asset } from '@/components/AssetPicker';
import { useDrag } from 'react-dnd';
import styles from './styles.module.css';

export function Item({ asset: { icon, label, type } }: { asset: Asset }) {
    const [_, dragRef] = useDrag({
        type: 'Asset',
        item: { type },
    });

    return (
        <div ref={dragRef} className={styles.assets__item}>
            {label}
        </div>
    );
}
