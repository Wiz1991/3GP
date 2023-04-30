import { forwardRef, HTMLProps, ReactNode } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

export const ToolbarButton = forwardRef<
    HTMLButtonElement,
    { children: ReactNode } & HTMLProps<HTMLButtonElement>
>(({ className, children, type: _, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            className={classNames(styles['toolbar-button'], className)}
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
});
