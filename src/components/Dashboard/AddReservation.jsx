import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import axios from "axios";

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Formats to "YYYY-MM-DD"
};

const AddReservationForm = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (values) => {
    try {
      // Make API request to add reservation
      await axios.post("http://localhost:3000/reserve", values);
      setOpen(true); // Show the notification on successful addition
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };

  return (
    <div style={{ margin: "0 30px 0 30px" }}>
      <Formik
        initialValues={{
          user_id: "",
          customerName: "",
          guestCount: "",
          customerEmail: "",
          phoneNumber: "",
          fromDate: "",
          toDate: "",
        }}
        onSubmit={(values, { resetForm }) => {
          // Adjust the payload format
          const payload = {
            user_id: values.user_id,
            customerName: values.customerName,
            guestCount: parseInt(values.guestCount, 10),
            customerEmail: values.customerEmail,
            phoneNumber: values.phoneNumber,
            fromDate: formatDate(values.fromDate),
            toDate: formatDate(values.toDate),
          };

          console.log("Payload:", payload);
          handleAdd(payload);
          resetForm();
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
                    name="user_id"
                    as={TextField}
                    label="User ID"
                    fullWidth
                    size="small"
                    sx={textFieldStyles}
                  />
                </Box>
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
              </Box>
              <Box display="flex" gap={2}>
                <Box flexBasis="45%">
                  <Field
                    name="guestCount"
                    as={TextField}
                    label="No. of Guests"
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Box>
                <Box flexBasis="45%">
                  <Field
                    name="customerEmail"
                    as={TextField}
                    label="Customer Email"
                    fullWidth
                    size="small"
                    type="email"
                  />
                </Box>
              </Box>
              <Box display="flex" gap={2}>
                <Box flexBasis="45%">
                  <Field
                    name="phoneNumber"
                    as={TextField}
                    label="Phone Number"
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
                    width: "100%",
                    height: "50px",
                    padding: "15px 0 15px 0", // Ensure the button takes full width
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
      <Divider style={{ paddingTop: "15px" }} variant="middle" />
    </div>
  );
};

export default AddReservationForm;
