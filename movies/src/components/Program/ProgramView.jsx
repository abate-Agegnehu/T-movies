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

function ProgramView({ open, handleClose, program }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    videoURL: "",
    duration: "",
    channel: "",
    category: "",
    type: "",
  });

  useEffect(() => {
    if (program) {
      setForm({
        title: program.title,
        description: program.description,
        duration: program.duration,
        status: program.status,
        videoURL: program.videoURL,
        category: program.category,
        type: program.type,
        channel: program.channel,
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
              {` ${form.title}`}
            </Typography>
          </Container>
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography
              gutterBottom
              color="textSecondary"
              variant="p"
              fullwidth
            >
              {`Duration: ${form.duration}`}
            </Typography>
          </Container>
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography gutterBottom color="textSecondary" variant="p">
              {`Description: ${form.description}`}
            </Typography>
          </Container>
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography gutterBottom color="textSecondary" variant="p">
              {`Status: ${form.status}`}
            </Typography>
          </Container>
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography gutterBottom color="textSecondary" variant="p">
              {`Category: ${form.category}`}
            </Typography>
          </Container>
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography gutterBottom color="textSecondary" variant="p">
              {`Type: ${form.type}`}
            </Typography>
          </Container>
          <Container item gutterBottom fullwidth style={{ margin: "10px" }}>
            <Typography gutterBottom color="textSecondary" variant="p">
              {`Channel: ${form.channel}`}
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
            <Button>
              <Link
                href={form.videoURL}
                className={classes.buttonLink}
                target="_blank"
                rel="noopener"
                underline="none"
                style={{
                  marginRight: "16px",
                  textTransform: "none",
                  width: "100px",
                  backgroundColor: "#01204E",
                  border: "1px solid #01204E",
                  color: "white",
                  display: "inline-block",
                  textAlign: "center",
                  lineHeight: "1.5rem",
                }}
              >
                See Video
              </Link>
            </Button>
          </Container>
        </Container>
      </Fade>
    </Modal>
  );
}

export default ProgramView;
