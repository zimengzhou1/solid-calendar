import * as React from "react";
import PropTypes from "prop-types";
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

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button variant="outlined" size="small">
          FAQ
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
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
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      ></Toolbar>
    </React.Fragment>
  );
}

export default Header;
