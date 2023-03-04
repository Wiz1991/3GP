import { AppProps } from 'next/app';
import '@/styles/index.css';
import useTheme from '../hooks/useTheme';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function App({ Component, pageProps }: AppProps) {
    const {} = useTheme();

    return (
        <Provider store={store}>
            <Component {...pageProps} />;
        </Provider>
    );
}
