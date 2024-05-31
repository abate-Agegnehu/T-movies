import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
  InputAdornment,
  Container,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    minWidth: "300px",
  },
  left: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    minWidth: "300px",
  },
  paperContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    minWidth: "300px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    margin: "25px",
    width: "100%",
  },

  loginText: {
    textAlign: "center",
    fontSize: "34px",
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: "40px",
  },
  login: {
    padding: "15px",
    backgroundColor: "#01204E",
    color: "#FFFFFF",
    fontWeight: "bold",
    "&:hover": {
      padding: "15px",
      backgroundColor: "#FFFFFF",
      color: "#01204E",
      fontWeight: "bold",
    },
  },
  movieContainer: {
    textAlign: "center",
  },
  movie: {
    fontSize: "60px",
    fontWeight: "bold",
    color: "lightgray",
  },
  logo: {
    marginBottom: theme.spacing(2),
    display: "block",
    margin: "0 auto",
  },
}));

function MyGrid() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} sm={6} className={classes.left}>
        <Container className={classes.paperContainer}>
          <div className={classes.movieContainer}>
            <img src={logo} alt="T-Movies Logo" className={classes.logo} />
            <Typography variant="h5" className={classes.movie}>
              T-Movies
            </Typography>
          </div>
        </Container>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.paperContainer}>
        <form className={classes.formContainer}>
          <Typography variant="h3" className={classes.loginText}>
            LOGIN
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            placeholder="Email Adress"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            fullWidth
            className={classes.login}
            type="submit"
            onClick={() => navigate("/layout")}
          >
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default MyGrid;
