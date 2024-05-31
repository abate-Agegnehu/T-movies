import { makeStyles } from "@material-ui/core";
import React from "react";
import ProgramNav from ".././components/Program/ProgramNav";
import ProgramTable from "../components/Program/ProgramTable";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
}));

function Program() {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <ProgramNav />
      <ProgramTable />
    </div>
  );
}

export default Program;

