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
import * as Yup from "yup";
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

const validationSchema = Yup.object({
  user_id: Yup.string().required("User ID is required"),
  customerName: Yup.string().required("Customer Name is required"),
  guestCount: Yup.number()
    .required("Number of Guests is required")
    .positive("Number of Guests must be positive")
    .integer("Number of Guests must be an integer"),
  customerEmail: Yup.string()
    .email("Invalid email format")
    .required("Customer Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
  fromDate: Yup.date().required("From Date is required"),
  toDate: Yup.date().required("To Date is required"),
});

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
        validationSchema={validationSchema}
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
        {({ handleSubmit, errors, touched }) => (
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
                    helperText={touched.user_id ? errors.user_id : ""}
                    error={touched.user_id && Boolean(errors.user_id)}
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
                    helperText={touched.customerName ? errors.customerName : ""}
                    error={touched.customerName && Boolean(errors.customerName)}
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
                    helperText={touched.guestCount ? errors.guestCount : ""}
                    error={touched.guestCount && Boolean(errors.guestCount)}
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
                    helperText={
                      touched.customerEmail ? errors.customerEmail : ""
                    }
                    error={
                      touched.customerEmail && Boolean(errors.customerEmail)
                    }
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
                    helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
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
                    helperText={touched.fromDate ? errors.fromDate : ""}
                    error={touched.fromDate && Boolean(errors.fromDate)}
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
                    helperText={touched.toDate ? errors.toDate : ""}
                    error={touched.toDate && Boolean(errors.toDate)}
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
