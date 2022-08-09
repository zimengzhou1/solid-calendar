import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useSession, LogoutButton } from "@inrupt/solid-ui-react";

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
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider", margin: 0 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push(`/faq`)}
        >
          FAQ
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          onClick={() => router.push(`/`)}
        >
          {title}
        </Typography>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}

        {!session.info.isLoggedIn ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push(`/login`)}
          >
            Login
          </Button>
        ) : (
          <LogoutButton onLogout={() => console.log("logged out!")}>
            <Button variant="outlined" size="small">
              Log out
            </Button>
          </LogoutButton>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
