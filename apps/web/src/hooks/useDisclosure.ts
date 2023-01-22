import { useCallback, useState } from 'react';

export default function useDisclosure(isOpenDefault = false) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    const open = useCallback(() => setIsOpen(true), []);

    const close = useCallback(() => setIsOpen(false), []);

    const toggle = useCallback(() => {
        isOpen ? close() : open();
    }, [isOpen]);

    return { isOpen, open, close, toggle };
}
