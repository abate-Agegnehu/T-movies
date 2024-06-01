import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@material-ui/core";
import {
  DashboardOutlined,
  Menu as MenuIcon,
  Person,
} from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import VideocamIcon from "@material-ui/icons/Videocam";
import logo from "../images/icons.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#f9f9f9",
    width: "100%",
    padding: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHidden: {
    [theme.breakpoints.down("sm")]: {
      width: 0,
      display: "none",
    },
  },
  root: {
    display: "flex",
  },
  active: {
    backgroundColor: "#01204E",
    color: "#ffffff",
  },
  toolbarback: {
    backgroundColor: "#01204E",
  },
  title: {
    flexGrow: 1,
    fontSize: theme.spacing(3),
    fontWeight: "bold",
  },
  appbar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  movie: {
    fontSize: "21px",
    color: "black",
    opacity: "0.7",
  },
  logo: {
    marginRight: "15px",
    width: "48px",
  },
  logoContainer: {
    padding: "8px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    boxShadow: "0px 2px 2px -1px gray",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#01204E",
      color: "#ffffff",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#ffffff",
      },
    },
  },
  iconButton: {
    backgroundColor: "#01204E",
    color: "#FFFFFF",
  },
  outletMargin: {
    marginLeft: 0,
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth,
    },
  },
}));

function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      path: "/layout/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      text: "Channel",
      path: "/layout/channel",
      icon: <VideocamIcon />,
    },
    {
      text: "Program",
      path: "/layout/program",
      icon: <AllInclusiveIcon />,
    },
  ];

  useEffect(() => {
    if (location.pathname === "/layout") {
      navigate("/layout/dashboard");
    }
  }, [location, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbarback}>
          {isMediumScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography className={classes.title}>
            {location.pathname.split("/").pop()}
          </Typography>
          <IconButton className={classes.iconButton}>
            <NotificationsIcon />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav
        className={`${classes.drawer} ${
          isMediumScreen ? classes.drawerHidden : ""
        }`}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isMediumScreen ? "temporary" : "permanent"}
          anchor="left"
          open={isMediumScreen ? mobileOpen : true}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div>
            <Typography variant="h6" noWrap className={classes.logoContainer}>
              <img src={logo} alt="T-Movies Logo" className={classes.logo} />
              <span className={classes.movie}>T-Movie</span>
            </Typography>
          </div>

          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                className={
                  location.pathname === item.path
                    ? `${classes.active} ${classes.listItem}`
                    : classes.listItem
                }
              >
                <ListItemIcon
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
