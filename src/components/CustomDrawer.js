import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ContactsIcon from "@mui/icons-material/Contacts";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
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

function CustomDrawer(props) {
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
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Homepage", "Availability", "Contacts", "Meetings"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index === 0 && <HomeIcon />}
                      {index === 1 && <EventAvailableIcon />}
                      {index === 2 && <GroupsIcon />}
                      {index === 3 && <ContactsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default CustomDrawer;
