import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && router.pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  }, [router]);
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
