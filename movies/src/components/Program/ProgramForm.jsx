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
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import axios from "axios";

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

function ProgramForm({ open, handleClose, program }) {
  const classes = useStyles();
  const [channelOpen, setChannelOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
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
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const validate = () => {
    let tempErrors = {};
    if (!form.title) tempErrors.title = "Title is required";
    if (!form.description) tempErrors.description = "Description is required";
    if (!form.status) tempErrors.status = "Status is required";
    if (!form.videoURL) tempErrors.videoURL = "Video URL is required";
    if (!form.duration) tempErrors.duration = "Duration is required";
    if (!form.channel) tempErrors.channel = "Channel is required";
    if (!form.category) tempErrors.category = "Category is required";
    if (!form.type) tempErrors.type = "Type is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (program) {
          await axios.put(
            `http://localhost:5000/update-program/${program.id}`,
            form
          );
        } else {
          await axios.post("http://localhost:5000/add-program", form);
        }
        handleClose();
        window.location.reload();
      } catch (error) {
        console.error("There was an error saving the program:", error);
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
            {program ? "Edit Program" : "Add Program"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.gridContainer}>
              <Grid item xs={6}>
                <Typography>Video URL</Typography>
                <TextField
                  fullWidth
                  name="videoURL"
                  value={form.videoURL}
                  onChange={handleChange}
                  error={!!errors.videoURL}
                  helperText={errors.videoURL}
                  className={classes.formField}
                />
                <Typography>Duration</Typography>
                <TextField
                  fullWidth
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  error={!!errors.duration}
                  helperText={errors.duration}
                  className={classes.formField}
                />
                <Typography>Description</Typography>
                <TextField
                  fullWidth
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  className={classes.formField}
                />

                <Typography>Channel</Typography>
                <div className={classes.formField}>
                  <TextField
                    fullWidth
                    name="channel"
                    value={form.channel}
                    onChange={handleChange}
                    onClick={() => setChannelOpen(!channelOpen)}
                    error={!!errors.channel}
                    helperText={errors.channel}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setChannelOpen(!channelOpen)}
                          >
                            {channelOpen ? (
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
                      channelOpen ? classes.dropdownMenuOpen : ""
                    }`}
                  >
                    <MenuItem
                      value="Recommended"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, channel: "Recommended" });
                        setTypeOpen(false);
                      }}
                    >
                      Recommended
                    </MenuItem>
                    <MenuItem
                      value="Popular"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, channel: "Popular" });
                        setTypeOpen(false);
                      }}
                    >
                      Popular
                    </MenuItem>
                    <MenuItem
                      value="Featured"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, channel: "Featured" });
                        setTypeOpen(false);
                      }}
                    >
                      Featured
                    </MenuItem>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography>Title</Typography>
                <TextField
                  fullWidth
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
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
                          <IconButton
                            onClick={() => setStatusOpen(!statusOpen)}
                          >
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
                      value="Active"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, status: "Active" });
                        setStatusOpen(false);
                      }}
                    >
                      Active
                    </MenuItem>
                    <MenuItem
                      value="Deactive"  
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
                <Typography>Category</Typography>
                <div className={classes.formField}>
                  <TextField
                    fullWidth
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    error={!!errors.category}
                    helperText={errors.category}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setCategoryOpen(!categoryOpen)}
                          >
                            {categoryOpen ? (
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
                      categoryOpen ? classes.dropdownMenuOpen : ""
                    }`}
                  >
                    <MenuItem
                      value="Recommended"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, category: "Recommended" });
                        setTypeOpen(false);
                      }}
                    >
                      Recommended
                    </MenuItem>
                    <MenuItem
                      value="Popular"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, category: "Popular" });
                        setTypeOpen(false);
                      }}
                    >
                      Popular
                    </MenuItem>
                    <MenuItem
                      value="Featured"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, category: "Featured" });
                        setTypeOpen(false);
                      }}
                    >
                      Featured
                    </MenuItem>
                  </div>
                </div>
                <Typography>Type</Typography>
                <div className={classes.formField}>
                  <TextField
                    fullWidth
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    onClick={() => setTypeOpen(!typeOpen)}
                    error={!!errors.type}
                    helperText={errors.type}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setTypeOpen(!typeOpen)}>
                            {typeOpen ? (
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
                      typeOpen ? classes.dropdownMenuOpen : ""
                    }`}
                  >
                    <MenuItem
                      value="Recommended"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, type: "Recommended" });
                        setTypeOpen(false);
                      }}
                    >
                      Recommended
                    </MenuItem>
                    <MenuItem
                      value="Popular"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, type: "Popular" });
                        setTypeOpen(false);
                      }}
                    >
                      Popular
                    </MenuItem>
                    <MenuItem
                      value="Featured"
                      className={classes.menuItem}
                      onClick={() => {
                        setForm({ ...form, type: "Featured" });
                        setTypeOpen(false);
                      }}
                    >
                      Featured
                    </MenuItem>
                  </div>
                </div>
              </Grid>
            </Grid>
          </form>
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

export default ProgramForm;
