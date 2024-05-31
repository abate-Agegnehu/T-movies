import React, { useState, useEffect } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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
  gridContainer: {
    padding: theme.spacing(2),
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "900",
  },
  formField: {
    margin: "10px 0 10px 0",
    backgroundColor: "lightgray",
    borderRadius: "5px",
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid lightgray",
    borderRadius: "5px",
    overflow: "hidden",
    maxHeight: 0,
    transition: "max-height 0.3s ease, opacity 0.3s ease",
    zIndex: 999,
    opacity: 0,
  },
  dropdownMenuOpen: {
    maxHeight: "150px",
    opacity: 1,
    border: "none",
  },
  menuItem: {
    borderRadius: "3px",
    margin: theme.spacing(1, 0),
    backgroundColor: "lightgray",
  },
}));

function ChannelForm({ open, handleClose, program }) {
  const classes = useStyles();
  const [statusOpen, setStatusOpen] = useState(false);
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.status) tempErrors.status = "Status is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        if (program) {
          const response = await axios.put(
            `http://localhost:5000/update-channel/${program.id}`,
            form
          );
        } else {
          const response = await axios.post(
            "http://localhost:5000/add-channel",
            form
          );
        }

        handleClose();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

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
        <div className={classes.paper}>
          <Typography
            variant="h6"
            id="transition-modal-title"
            className={classes.title}
          >
            {program ? "Edit Channel" : "Add Channel"}
          </Typography>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12}>
              <Typography>Name</Typography>
              <TextField
                fullWidth
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                className={classes.formField}
              />
              <Typography>Status</Typography>
              <div className={classes.formField}>
                <TextField
                  fullWidth
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  onClick={() => setStatusOpen(!statusOpen)}
                  error={!!errors.status}
                  helperText={errors.status}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setStatusOpen(!statusOpen)}>
                          {statusOpen ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div
                  className={`${classes.dropdownMenu} ${
                    statusOpen ? classes.dropdownMenuOpen : ""
                  }`}
                >
                  <MenuItem
                    value="Category 1"
                    className={classes.menuItem}
                    onClick={() => {
                      setForm({ ...form, status: "Active" });
                      setStatusOpen(false);
                    }}
                  >
                    Active
                  </MenuItem>
                  <MenuItem
                    value="Category 2"
                    className={classes.menuItem}
                    onClick={() => {
                      setForm({ ...form, status: "Deactive" });
                      setStatusOpen(false);
                    }}
                  >
                    Deactive
                  </MenuItem>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className={classes.btnContainer}>
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
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                textTransform: "none",
                width: "100px",
                backgroundColor: "#01204E",
                color: "#FFFFFF",
                border: "1px solid #01204E",
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default ChannelForm;
