import "../../styles/globals.css";
import { SessionProvider } from "@inrupt/solid-ui-react";
import Header from "../components/Header";
import CustomDrawer from "../components/CustomDrawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider restorePreviousSession={true}>
      {/* <Header /> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header title="Solid Calendar" />
        <CustomDrawer />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Component {...pageProps} />
        </Box>
      </Box>
    </SessionProvider>
  );
}

export default MyApp;
