import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store,persistor } from '../store';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
    </ThemeProvider>

  );
}

export default MyApp;
