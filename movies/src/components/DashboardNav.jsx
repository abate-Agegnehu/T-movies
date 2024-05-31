
import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  makeStyles,
  Popover,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PublishIcon from "@material-ui/icons/Publish";
import FilterListIcon from "@material-ui/icons/FilterList";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    color: "black",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "lightgray",
    opacity: 0.6,
    "&:hover": {
      backgroundColor: "lightgray",
      opacity: 0.6,
    },
    marginRight: theme.spacing(6),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    transition: theme.transitions.create("width"),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
  appbar: {
    backgroundColor: "#ffffff",
  },
  btn: {
    marginLeft: theme.spacing(1),
    textTransform: "none",
    fontWeight: "normal",
    color: "#01204E",
  },
  btnContained: {
    color: "#FFFFFF",
    backgroundColor: "#01204E",
    textTransform: "none",
  },
  btnColor: {
    color: "#FFFFFF",
    "&:hover": {
      color: "#01204E",
    },
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(500)]: {
      display: "none",
    },
  },
  btnContainerPopup: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  horizontal: {
    border: "1px solid lightgray",
    display: "block",
    margin: "10px 25px 20px 45px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down(500)]: {
      display: "flex",
      color: "#01204E",
    },
  },
}));

function DashboardNav() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <AppBar position="static" className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.btnContainer}>
            <Button className={classes.btn}>
              <PublishIcon />
              <span className={classes.btn}> Export</span>
            </Button>
            <Button className={classes.btn}>
              <FilterListIcon />
              <span className={classes.btn}> Add Filter</span>
            </Button>
            <Button className={classes.btnContained} onClick={handleFormOpen}>
              <span className={classes.btnColor}> Add Filter</span>
            </Button>
          </div>
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleMenuClick}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className={classes.btnContainerPopup}>
              <Button className={classes.btn}>
                <PublishIcon />
                <span className={classes.btn}> Export</span>
              </Button>
              <Button className={classes.btn}>
                <FilterListIcon />
                <span className={classes.btn}> Add Filter</span>
              </Button>
              <Button className={classes.btnContained} onClick={handleFormOpen}>
                <span className={classes.btnColor}> Add Filter</span>
              </Button>
            </div>
          </Popover>
        </Toolbar>
      </AppBar>
      <div className={classes.horizontal}></div>
    </div>
  );
}

export default DashboardNav;
