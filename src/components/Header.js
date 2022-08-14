import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import { useSession, LogoutButton } from "@inrupt/solid-ui-react";

const drawerWidth = 240;

function Header(props) {
  const { title } = props;
  const { session } = useSession();
  const router = useRouter();

  let loginButton;
  if (session) {
    if (session.info.isLoggedIn) {
      loginButton = (
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push(`/login`)}
        >
          Login
        </Button>
      );
    } else {
      loginButton = (
        <LogoutButton onLogout={() => console.log("logged out!")}>
          <Button variant="outlined" size="small">
            Log out
          </Button>
        </LogoutButton>
      );
    }
  }

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          borderBottom: 1,
          borderColor: "divider",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push(`/faq`)}
            edge="start"
            color="primary"
            aria-label="faq"
            sx={{ mr: 2 }}
          >
            FAQ
          </Button>

          <Typography
            component="h2"
            variant="h5"
            color="primary"
            align="center"
            noWrap
            sx={{ flex: 1 }}
            onClick={() => router.push(`/`)}
          >
            {title}
          </Typography>

          {!session.info.isLoggedIn ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => router.push(`/login`)}
              edge="primary"
              color="inherit"
              aria-label="login"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
          ) : (
            <LogoutButton onLogout={() => console.log("logged out!")}>
              <Button
                variant="outlined"
                size="small"
                edge="start"
                color="primary"
                aria-label="logout"
                sx={{ mr: 2 }}
              >
                Log out
              </Button>
            </LogoutButton>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
