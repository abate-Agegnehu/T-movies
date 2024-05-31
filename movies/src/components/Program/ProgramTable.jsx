import React, { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Cancel as DeactiveIcon,
} from "@mui/icons-material";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
import updown from "../../images/updown.png";
import ProgramForm from "./ProgramForm"; // Make sure the path is correct
import ProgramView from "./ProgramView";

const useStyles = makeStyles((theme) => ({
  updownIcon: {
    color: "black",
    width: "14px",
    marginRight: "15px",
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

const ProgramTable = () => {
  const classes = useStyles();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/programs");
      setPrograms(response.data.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleStatus = (row) => {
    row.status = row.status === "Active" ? "Deactive" : "Active";

    axios
      .put(`http://localhost:5000/update-program/${row.id}`, row)
      .then((response) => {
        fetchPrograms();
      })
      .catch((error) => {
        console.error("There was an error updating the program status!", error);
      });
  };

  const handleEdit = (row) => {
    setSelectedProgram(row);
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    axios
      .delete(`http://localhost:5000/delete-program/${row.id}`)
      .then((response) => {
        fetchPrograms();
      })
      .catch((error) => {
        console.error("There was an error deleting the program!", error);
      });
  };

  const handleView = (row) => {
    setSelectedProgram(row);
    setIsViewOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
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
              <TableCell>ID</TableCell>
              <TableCell>
                <img
                  src={updown}
                  alt=""
                  srcSet=""
                  className={classes.updownIcon}
                />
                Title
              </TableCell>
              <TableCell>
                <img
                  src={updown}
                  alt=""
                  srcSet=""
                  className={classes.updownIcon}
                />
                Duration
              </TableCell>
              <TableCell>
                <img
                  src={updown}
                  alt=""
                  srcSet=""
                  className={classes.updownIcon}
                />
                Description
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.description}</TableCell>
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
      <ProgramForm
        open={isModalOpen}
        handleClose={handleCloseModal}
        program={selectedProgram}
      />
      <ProgramView
        open={isViewOpen}
        handleClose={handleColoseView}
        program={selectedProgram}
      />
    </>
  );
};

export default ProgramTable;
