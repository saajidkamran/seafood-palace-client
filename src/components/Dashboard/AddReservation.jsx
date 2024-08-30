import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik, Form, Field } from "formik";

const textFieldStyles = {
  "& .MuiInputBase-input": {
    color: "black", // Text color
  },
  "& .MuiInputLabel-root": {
    color: "black", // Label color
  },
  "& .MuiFormLabel-root": {
    color: "black", // Label color when focused
  },
  "& .MuiInputBase-root": {
    borderColor: "black", // Border color
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "black", // Border color before focus
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "black", // Border color on hover
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black", // Border color after focus
  },
  "& .MuiInput-underline.Mui-focused:after": {
    borderBottomColor: "blue", // Border color when focused
  },
};

const AddReservationForm = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // add reservation api
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          customerName: "",
          reservationId: "",
          numberOfGuests: "",
          fromDate: "",
          toDate: "",
        }}
        onSubmit={(values, { resetForm }) => {
          onAdd(values);
          resetForm();
          setOpen(true); // Show the notification
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems={"center"}
              gap={2}
            >
              <Typography>Add new Reservation</Typography>
              <Box display="flex" gap={2}>
                <Box flexBasis="45%">
                  <Field
                    name="customerName"
                    as={TextField}
                    label="Customer Name"
                    fullWidth
                    size="small"
                    sx={textFieldStyles}
                  />
                </Box>
                <Box flexBasis="45%">
                  <Field
                    name="reservationId"
                    as={TextField}
                    label="Reservation ID"
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>
              <Box display="flex" gap={2}>
                <Box flexBasis="45%">
                  <Field
                    name="numberOfGuests"
                    as={TextField}
                    label="No. of Guests"
                    fullWidth
                    size="small"
                  />
                </Box>
                <Box flexBasis="45%">
                  <Field
                    name="fromDate"
                    as={TextField}
                    label="From Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>
              <Box display="flex" gap={2}>
                <Box flexBasis="45%">
                  <Field
                    name="toDate"
                    as={TextField}
                    label="To Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>
              <Box display="flex">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                    width: "100%", // Ensure the button takes full width
                  }}
                >
                  Add Reservation
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Snackbar for notifications */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Reservation added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddReservationForm;
