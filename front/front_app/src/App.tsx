import React, { useEffect } from "react";
import { AppDispatch } from "./app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  selectSubjects,
  fetchAsyncGetUser,
  fetchAsyncGetSubject,
} from "./features/auth/authSlice";

import { NavLink } from "react-router-dom";

import styles from "./App.module.css";
import grey from "@material-ui/core/colors/grey";
import { useTheme } from "@material-ui/core/styles";
import { styled, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SensorDoorRoundedIcon from "@mui/icons-material/SensorDoorRounded";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export interface Menu {
  children: React.ReactNode;
}

export const App: React.FC = ({ children }) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const loginUser = useSelector(selectLoginUser);
  const subjects = useSelector(selectSubjects);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/login";
  };

  const current = {
    color: "#0679EB",
    textDecoration: "none",
    background: grey[100],
    width: "100%",
    display: "inline-block",
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetUser());
      await dispatch(fetchAsyncGetSubject());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          open={open}
          style={{ backgroundColor: "#0679EB" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              知りたいもん
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div className={styles.app__userBox}>
            <p className={styles.app__name}>
              {loginUser.usersName}
              {loginUser.studentGroupId === null && <>先生</>}
            </p>
            <p className={styles.app__scholl}>{loginUser.schoolsName}</p>
            <p className={styles.app__scholl}>{loginUser.studentGroupName}</p>
          </div>
          <Divider />
          <List>
            <NavLink exact to="/home" activeStyle={current}>
              <ListItem button>
                <ListItemIcon>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="ホーム" />
              </ListItem>
            </NavLink>
            <NavLink
              exact
              to="/"
              className={styles.app__nav}
              activeStyle={current}
            >
              <ListItem button>
                <ListItemIcon>
                  <MailOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="通知" />
              </ListItem>
            </NavLink>
            <NavLink
              exact
              to="/"
              className={styles.app__nav}
              activeStyle={current}
            >
              <ListItem button>
                <ListItemIcon>
                  <NotificationsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="学校からのお知らせ" />
              </ListItem>
            </NavLink>
            {subjects.map((subject, index) => (
              <NavLink
                exact
                to={"/room/" + subject.subjectsId}
                className={styles.app__nav}
                activeStyle={current}
                key={index}
              >
                <ListItem button key={subject.subjectsId}>
                  <ListItemIcon>
                    <SensorDoorRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={subject.subjectsName + "の部屋"} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={Logout}>
              <ListItemIcon>
                <SettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="設定" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="使い方" />
            </ListItem>
            <ListItem button onClick={Logout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    </div>
  );
};

export default App;
