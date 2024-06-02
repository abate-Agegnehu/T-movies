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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DepartmentChart from "../components/DepartmentChart";

const data = [
  { name: "MON", value1: 20, value2: 30, value3: 10, value4: 40, value5: 30 },
  { name: "TUE", value1: 30, value2: 20, value3: 40, value4: 10, value5: 50 },
  { name: "WED", value1: 40, value2: 50, value3: 20, value4: 30, value5: 40 },
  { name: "THUR", value1: 50, value2: 40, value3: 30, value4: 20, value5: 60 },
  { name: "FRI", value1: 60, value2: 30, value3: 50, value4: 10, value5: 70 },
  { name: "SAT", value1: 70, value2: 20, value3: 40, value4: 30, value5: 80 },
  { name: "SUN", value1: 80, value2: 60, value3: 30, value4: 20, value5: 90 },
];

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
  chartContainer: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    width: "94%",
  },
  chartTitle: {
    position: "absolute",
    top: "-40px",
    left: "0",
    backgroundColor: "#000",
    color: "#fff",
    padding: "15px 60px",
    borderRadius: "4px",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 30px",
      fontSize: "14px",
    },
  },
  overallProgram: {
    position: "absolute",
    top: "40px",
    right: "20px",
    backgroundColor: "#000",
    color: "#fff",
    padding: "15px 40px",
    borderRadius: "4px",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
      display: "none",
      top: "40px",
      right: "20px",
    },
  },
  legendContainer: {
    position: "absolute",
    top: "120px",
    right: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
      display: "none",
    },
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  legendColorBox: {
    width: "20px",
    height: "20px",
    marginRight: "8px",
    marginTop: "15px",
    borderRadius: "50%",
  },
  legendText: {
    marginTop: "15px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  legendValue: {
    marginTop: "15px",
    marginLeft: "100px",
    marginRight: "20px",
    fontSize: "18px",
    opacity: 0.8,
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <DashboardNav />
      <Container style={{ marginBottom: "40px" }}>
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

      <DepartmentChart />
      <Container className={classes.chartContainer}>
        <Typography className={classes.chartTitle}>
          Program with Type
        </Typography>
        <Typography className={classes.overallProgram}>
          201 over all program
        </Typography>

        <ResponsiveContainer
          height={400}
          width={500}
        >
          <LineChart
            data={data}
            margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value1" stroke="#c2185b" />
            <Line type="monotone" dataKey="value2" stroke="#4caf50" />
            <Line type="monotone" dataKey="value3" stroke="#9c27b0" />
            <Line type="monotone" dataKey="value4" stroke="#ffeb3b" />
            <Line type="monotone" dataKey="value5" stroke="#2196f3" />
            {/* Your chart components */}
          </LineChart>
        </ResponsiveContainer>
        <div className={classes.legendContainer}>
          <div className={classes.legendItem}>
            <div
              className={classes.legendColorBox}
              style={{ backgroundColor: "#c2185b" }}
            ></div>
            <Typography className={classes.legendText}>Name</Typography>
            <Typography className={classes.legendValue}>500</Typography>
          </div>
          <div className={classes.legendItem}>
            <div
              className={classes.legendColorBox}
              style={{ backgroundColor: "#4caf50" }}
            ></div>
            <Typography className={classes.legendText}>Name</Typography>
            <Typography className={classes.legendValue}>500</Typography>
          </div>
          <div className={classes.legendItem}>
            <div
              className={classes.legendColorBox}
              style={{ backgroundColor: "#9c27b0" }}
            ></div>
            <Typography className={classes.legendText}>Name</Typography>
            <Typography className={classes.legendValue}>500</Typography>
          </div>
          <div className={classes.legendItem}>
            <div
              className={classes.legendColorBox}
              style={{ backgroundColor: "#ffeb3b" }}
            ></div>
            <Typography className={classes.legendText}>Name</Typography>
            <Typography className={classes.legendValue}>500</Typography>
          </div>
          <div className={classes.legendItem}>
            <div
              className={classes.legendColorBox}
              style={{ backgroundColor: "#2196f3" }}
            ></div>
            <Typography className={classes.legendText}>Name</Typography>
            <Typography className={classes.legendValue}>500</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
