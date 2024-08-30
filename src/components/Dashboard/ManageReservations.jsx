import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";

const ManageReservations = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editFields, setEditFields] = useState({}); // Temporary state for edit fields

  // Fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reserve");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle field change
  const handleFieldChange = (id, field) => (e) => {
    const value = e.target.value;
    setEditFields((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Handle update
  const handleUpdate = async (id) => {
    try {
      const updatedFields = editFields[id];
      if (updatedFields) {
        await axios.put(`http://localhost:3000/reserve/${id}`, updatedFields);

        // Update local state
        const updatedData = data.map((reservation) =>
          reservation._id === id
            ? { ...reservation, ...updatedFields }
            : reservation
        );
        setData(updatedData);
        setSnackbarMessage("Successfully updated");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/reserve/${deleteId}`);

      // Update local state
      const updatedData = data.filter(
        (reservation) => reservation._id !== deleteId
      );
      setData(updatedData);
      setSnackbarMessage("Successfully deleted");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting reservation:", error);
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Divider style={{ paddingTop: "20px" }} />

      <TableContainer component={Paper}>
        <Typography variant="h6" component="div" sx={{ margin: 2 }}>
          Manage Reservations
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Reservation ID</TableCell>
              <TableCell>From Date</TableCell>
              <TableCell>To Date</TableCell>
              <TableCell>No. of Guests</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((reservation) => (
              <TableRow key={reservation._id}>
                <TableCell>
                  <TextField
                    value={
                      editFields[reservation._id]?.customerName ||
                      reservation.customerName
                    }
                    onChange={handleFieldChange(
                      reservation._id,
                      "customerName"
                    )}
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={
                      editFields[reservation._id]?.customerEmail ||
                      reservation.customerEmail
                    }
                    onChange={handleFieldChange(
                      reservation._id,
                      "customerEmail"
                    )}
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={
                      editFields[reservation._id]?.phoneNumber ||
                      reservation.phoneNumber
                    }
                    onChange={handleFieldChange(reservation._id, "phoneNumber")}
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>{reservation._id}</TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={
                      editFields[reservation._id]?.fromDate?.split("T")[0] ||
                      reservation.fromDate.split("T")[0]
                    }
                    onChange={handleFieldChange(reservation._id, "fromDate")}
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={
                      editFields[reservation._id]?.toDate?.split("T")[0] ||
                      reservation.toDate.split("T")[0]
                    }
                    onChange={handleFieldChange(reservation._id, "toDate")}
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={
                      editFields[reservation._id]?.guestCount ||
                      reservation.guestCount
                    }
                    onChange={handleFieldChange(reservation._id, "guestCount")}
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={reservation.isActive ? "success" : "error"}
                    disabled={!reservation.isActive}
                  >
                    {reservation.isActive ? "Active" : "Inactive"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="black"
                    sx={{
                      width: "100%",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "darkgray" },
                    }}
                    onClick={() => handleUpdate(reservation._id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: "100%", marginTop: 1 }}
                    onClick={() => handleDelete(reservation._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reservation? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelDelete}
            sx={{
              width: "100%",
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "darkgray" },
            }}
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" sx={{ width: "100%" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageReservations;
