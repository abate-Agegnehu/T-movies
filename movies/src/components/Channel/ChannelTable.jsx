import React, { useState, useEffect } from "react";
import { Button, Switch, makeStyles } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Cancel as DeactiveIcon,
} from "@material-ui/icons";

import updown from "../../images/updown.png";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
import ChannelForm from "./ChannelForm";
import ChannelView from "./ChannelView";

const useStyles = makeStyles((theme) => ({
  updownIcon: {
    color: "black",
    width: "14px",
    marginLeft: "15px",
    opacity: 0.6,
  },
  active: {
    textTransform: "none",
    backgroundColor: "rgba(212, 238, 234, 0.877)",
    boxShadow: "0 0 0 0 ",
    opacity: 0.8,
    color: "green",
    "&:hover": {
      backgroundColor: "rgba(212, 238, 234, 0.877)",
      opacity: 1,
      color: "green",
    },
  },
  deactive: {
    textTransform: "none",
    backgroundColor: "rgba(253, 213, 213, 0.966)",
    boxShadow: "0 0 0 0 ",
    opacity: 0.8,
    color: "red",
    "&:hover": {
      backgroundColor: "rgba(253, 213, 213, 0.966)",
      opacity: 1,
      color: "red",
    },
  },
}));

const ChannelTable = () => {
  const classes = useStyles();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/channels");
      setPrograms(response.data.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleStatus = (row) => {
    row.status = row.status === "Active" ? "Deactive" : "Active";
    setIsChecked(!isChecked);

    axios
      .put(`http://localhost:5000/update-channel/${row.id}`, row)
      .then((response) => {
        console.log(response.data.message);
        fetchPrograms();
      })
      .catch((error) => {
        console.error("There was an error updating the channel status!", error);
      });
  };

  const handleEdit = (row) => {
    setSelectedProgram(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  const handleDelete = (row) => {
    axios
      .delete(`http://localhost:5000/delete-channel/${row.id}`)
      .then((response) => {
        console.log(response.data.message);
        fetchPrograms();
      })
      .catch((error) => {
        console.error("There was an error deleting the channel!", error);
      });
    window.location.reload();
  };

  const handleView = (row) => {
    setSelectedProgram(row);
    setIsViewOpen(true);
  };
  const handleColoseView = () => {
    setIsViewOpen(false);
    setSelectedProgram(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
                <img
                  src={updown}
                  alt=""
                  srcset=""
                  className={classes.updownIcon}
                  style={{ marginLeft: "10px" }}
                />
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.status === "Active" ? (
                    <Button
                      variant="contained"
                      onClick={() => handleStatus(row)}
                      className={classes.active}
                      color="success"
                    >
                      <DoneIcon color="success" />
                      Active
                      <Switch checked={isChecked} style={{ color: "green" }} />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleStatus(row)}
                      className={classes.deactive}
                      color="error"
                    >
                      <DeactiveIcon color="error" />
                      Deactive
                      <Switch checked={isChecked} style={{ color: "red" }} />
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton onClick={() => handleView(row)}>
                    <ViewIcon color="action" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ChannelForm
        open={isModalOpen}
        handleClose={handleCloseModal}
        program={selectedProgram}
      />
      <ChannelView
        open={isViewOpen}
        handleClose={handleColoseView}
        program={selectedProgram}
      />
    </>
  );
};

export default ChannelTable;
