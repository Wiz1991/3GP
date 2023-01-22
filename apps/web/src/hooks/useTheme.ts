import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import useMediaQuery from './useMediaQuery';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
    System = 'system',
}

function useTheme({
    initialTheme = Theme.Dark,
}: { initialTheme?: Theme } = {}) {
    const prefersDark = useMediaQuery(`(prefers-color-scheme:dark)`);

    const [theme, setTheme] = useLocalStorage(
        'theme',
        initialTheme ?? Theme.System
    );

    useEffect(() => {
        const attribute =
            theme === Theme.System ? (prefersDark ? 'dark' : 'light') : theme;
        document.body.setAttribute('data-theme', attribute);
    }, [theme, prefersDark]);

    return { theme, setTheme };
}

export default useTheme;
