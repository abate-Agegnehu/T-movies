import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const data = [
  { name: "Name1", value: 1, color: "#A500BC" },
  { name: "Name2", value: 1, color: "#E42E2A" },
  { name: "Name3", value: 1, color: "#00A651" },
  { name: "Name4", value: 1, color: "#0072CE" },
  { name: "Name5", value: 1, color: "#A3C853" },
];

const COLORS = ["#A500BC", "#E42E2A", "#00A651", "#0072CE", "#A3C853"];

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    position: "relative",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
  },
  chartCenterText: {
    position: "absolute",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#01204E",
    textAlign: "center",
  },
  piechart: {
    position: "relative",
  },
  categoryContainer: {
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    width: "65%",
    margin: "90px 34px 90px 34px",
  },
  chartTitle: {
    position: "absolute",
    top: "-50px",
    left: "0",
    backgroundColor: "#000",
    color: "#fff",
    padding: "15px 60px",
    borderRadius: "4px",
    fontSize: "18px",
  },
  legendContainer: {
    position: "absolute",
    top: "0",
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

const DepartmentChart = () => {
  const classes = useStyles();

  return (
    <div className={classes.categoryContainer}>
      <Typography className={classes.chartTitle}>
        Program On Category
      </Typography>
      <div className={classes.chartContainer}>
        <PieChart width={200} height={200} className={classes.piechart}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className={classes.chartCenterText}>Department</div>
      </div>
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
    </div>
  );
};

export default DepartmentChart;
