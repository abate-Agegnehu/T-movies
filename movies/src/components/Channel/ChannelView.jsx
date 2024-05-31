import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Fade,
  Modal,
  Backdrop,
  Container,
  Link,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid lightgray",
    boxShadow: "0px 4px 4px -2px gray",
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
    width: "50%",
  },
  buttonLink: {
    display: "inline-block",
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function ChannelView({ open, handleClose, program }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [form, setForm] = useState({
    name: "",
    status: "",
  });

  useEffect(() => {
    if (program) {
      setForm({
        name: program.name,
        status: program.status,
      });
    }
  }, [program]);

  

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container container className={classes.paper} maxWidth="sm">
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography
              gutterBottom
              align="center"
              color="primary"
              variant="h4"
            >
              {` ${form.name} `}
            </Typography>
          </Container>
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography
              gutterBottom
              color="textSecondary"
              variant="p"
              fullwidth
            >
              {`Name: ${form.name}`}
            </Typography>
          </Container>
 
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography gutterBottom color="textSecondary" variant="p">
              {`Status: ${form.status}`}
            </Typography>
          </Container>
        
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{
                marginRight: "16px",
                textTransform: "none",
                width: "100px",
                backgroundColor: "white",
                border: "1px solid #01204E",
                color: "#01204E",
              }}
            >
              Cancel
            </Button>
         
          </Container>
        </Container>
      </Fade>
    </Modal>
  );
}

export default ChannelView;
