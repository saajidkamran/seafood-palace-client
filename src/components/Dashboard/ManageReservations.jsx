import React, { useState } from "react";
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
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

// Sample data
const initialReservations = [
  {
    id: 1,
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "123-456-7890",
    reservationId: "R123",
    fromDate: "2024-09-01",
    toDate: "2024-09-07",
    numberOfGuests: 4,
    isActive: true,
  },
  {
    id: 2,
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "098-765-4321",
    reservationId: "R124",
    fromDate: "2024-09-05",
    toDate: "2024-09-10",
    numberOfGuests: 2,
    isActive: false,
  },
  // Add more reservations as needed
];

const ManageReservations = () => {
  const [data, setData] = useState(initialReservations);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    //update delet
  });
  const handleUpdate = (updatedReservation) => {
    const updatedData = data.map((reservation) =>
      reservation.id === updatedReservation.id
        ? updatedReservation
        : reservation
    );
    setData(updatedData);
    setSnackbarMessage("Successfully updated");
    setSnackbarOpen(true);
  };

  const handleFieldChange = (id, field, value) => {
    const updatedData = data.map((reservation) =>
      reservation.id === id ? { ...reservation, [field]: value } : reservation
    );
    setData(updatedData);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    const updatedData = data.filter(
      (reservation) => reservation.id !== deleteId
    );
    setData(updatedData);
    setOpenDialog(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

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
              <TableRow key={reservation.id}>
                <TableCell>
                  <TextField
                    value={reservation.customerName}
                    onChange={(e) =>
                      handleFieldChange(
                        reservation.id,
                        "customerName",
                        e.target.value
                      )
                    }
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={reservation.customerEmail}
                    onChange={(e) =>
                      handleFieldChange(
                        reservation.id,
                        "customerEmail",
                        e.target.value
                      )
                    }
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={reservation.customerPhone}
                    onChange={(e) =>
                      handleFieldChange(
                        reservation.id,
                        "customerPhone",
                        e.target.value
                      )
                    }
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>{reservation.reservationId}</TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={reservation.fromDate}
                    onChange={(e) =>
                      handleFieldChange(
                        reservation.id,
                        "fromDate",
                        e.target.value
                      )
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={reservation.toDate}
                    onChange={(e) =>
                      handleFieldChange(
                        reservation.id,
                        "toDate",
                        e.target.value
                      )
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={reservation.numberOfGuests}
                    onChange={(e) =>
                      handleFieldChange(
                        reservation.id,
                        "numberOfGuests",
                        e.target.value
                      )
                    }
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
                    onClick={() => handleUpdate(reservation)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: "100%", marginTop: 1 }}
                    onClick={() => handleDelete(reservation.id)}
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
        message={snackbarMessage}
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
