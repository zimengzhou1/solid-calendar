import "../../styles/globals.css";
import { SessionProvider } from "@inrupt/solid-ui-react";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider restorePreviousSession={true}>
      {/* <Header /> */}
      <Header title="Solid Calendar" />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
