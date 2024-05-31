import { makeStyles } from "@material-ui/core";
import React from "react";
import ChannelTable from ".././components/Channel/ChannelTable";
import ChannelNav from ".././components/Channel/ChannelNav";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
}));

function Channel() {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <ChannelNav />  
      <ChannelTable />
    </div>
  );
}

export default Channel;
