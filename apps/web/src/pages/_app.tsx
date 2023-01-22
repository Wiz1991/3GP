import { AppProps } from 'next/app';
import '@/styles/index.css';
import useTheme from '../hooks/useTheme';

export default function App({ Component, pageProps }: AppProps) {
    const {} = useTheme();

    return <Component {...pageProps} />;
}
