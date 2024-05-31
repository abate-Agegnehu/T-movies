import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import DashboardNav from "../components/DashboardNav";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  cardIcon: {
    backgroundColor: "#01204E",
    color: "#ffffff",
    padding: "8px 10px",
    borderRadius: theme.spacing(1),
    marginLeft: "18px",
    marginTop: "12px",
  },
  card: {
    margin: "12px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  status: {
    fontWeight: "normal",
    margin: "0 0 10px 0",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <DashboardNav/>
      <Container>
        <Grid container spacing={3} className={classes.cardContainer}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                action={
                  <div className={classes.cardIcon}>
                    <PeopleIcon />
                  </div>
                }
                title="System User"
              />
              <CardContent>
                <Typography className={classes.status}>37</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  +12% This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                action={
                  <div className={classes.cardIcon}>
                    <PeopleIcon />
                  </div>
                }
                title="Program"
              />
              <CardContent>
                <Typography className={classes.status}>37</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  +12% This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                action={
                  <div className={classes.cardIcon}>
                    <PeopleIcon />
                  </div>
                }
                title="Channel"
              />
              <CardContent>
                <Typography className={classes.status}>37</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  +12% This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <div>Dash board</div>
    </div>
  );
}

export default Dashboard;
