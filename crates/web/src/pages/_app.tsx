import { AppProps } from 'next/app';
import '@/styles/index.css';
import useTheme from '../hooks/useTheme';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App({ Component, pageProps }: AppProps) {
    const {} = useTheme();

    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <Component {...pageProps} />
            </DndProvider>
        </Provider>
    );
}
