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
  Container,
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
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {},
  },
  drawerPaper: {
    width: drawerWidth,
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
    padding: theme.spacing(2),
    flexGrow: 1,
    fontSize: theme.spacing(3),
    fontWeight: "bold",
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
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
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBarShift: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
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
    marginLeft:50,
  },
}));

function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
      <AppBar
        className={isSmallScreen ? classes.appBarShift : classes.appbar}
        elevation={0}
      >
        <Toolbar className={classes.toolbarback}>
          {isSmallScreen && (
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
          <div className={classes.iconButton}>
            <IconButton className={classes.iconButton}>
              <NotificationsIcon />
            </IconButton>
          </div>
          <div className={classes.iconButton}>
            <IconButton className={classes.iconButton}>
              <Person />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          anchor="left"
          open={isSmallScreen ? mobileOpen : true}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div>
            <Typography variant="h6" noWrap className={classes.logoContainer}>
              <img src={logo} alt="T-Movies Logo" className={classes.logo} />
              <span className={classes.movie}> T-Movie</span>
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
                    : null
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
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                  primary={item.text}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>
      <div className={`${classes.page} ${classes.outletMargin}`}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
