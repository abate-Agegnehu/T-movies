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
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
} from "recharts";

const data = [
  { name: "2017", react: 32, angular: 37, vue: 60 },
  { name: "2018", react: 42, angular: 42, vue: 54 },
  { name: "2019", react: 51, angular: 41, vue: 54 },
  { name: "2020", react: 60, angular: 37, vue: 28 },
  { name: "2021", react: 51, angular: 31, vue: 27 },
  { name: "2022", react: 95, angular: 44, vue: 49 },
];

const lables = ["2017", "2018", "2019", "2020", "2021", "2022"];

export const data2 = {
  lables,
  dataset: [
    {
      label: "React",
      data: [32, 42, 51, 60, 51, 95],
      backgroundColor: "#2196F3",
      borderColor: "#2196F3",
    },
    {
      label: "Angular",
      data: [37, 42, 41, 37, 31, 44],
      backgroundColor: "#F44236",
      borderColor: "#F44236",
    },
    {
      label: "Vue",
      data: [60, 54, 54, 28, 27, 49],
      backgroundColor: "#FFCA29",
      borderColor: "#FFCA29",
    },
  ],
};

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
      <DashboardNav />
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
      <LineChart width={600} height={300} data={data}>
        <Line
          type="monotone"
          dataKey="react"
          stroke="#2196F3"
          strokeWidth={3}
        />
        <Line type="monotone" dataKey="angular" stroke="#F44" strokeWidth={3} />
        <Line type="monotone" dataKey="vue" stroke="#2196F3" strokeWidth={3} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}

export default Dashboard;
