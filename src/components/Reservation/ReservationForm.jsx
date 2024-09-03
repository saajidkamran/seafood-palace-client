import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Grid, Paper, Box, TextField, Button, Typography } from "@mui/material";

// Define your validation schema with Yup
// Define your validation schema with Yup
const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer name is required"),
  numberOfGuests: Yup.number()
    .required("Number of guests is required")
    .positive()
    .integer(),
  fromDate: Yup.date().required("From date is required"),
  toDate: Yup.date()
    .required("To date is required")
    .min(Yup.ref("fromDate"), "To date must be after from date"),
  phoneNo: Yup.string().required("Phone number is required"),
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email ID is required"),
});

const ReservationForm = () => {
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/reserve", // Updated API endpoint
        {
          customerName: values.customerName,
          guestCount: parseInt(values.numberOfGuests, 10),
          customerEmail: values.emailId,
          phoneNumber: values.phoneNo,
          toDate: values.toDate,
          fromDate: values.fromDate,
          mesage: values.message,
        }
      );
      // Handle successful response
      console.log("Reservation successful:", response.data);
      setSuccessMessage("Reservation successfully made!");
      resetForm(); // Clear form fields
    } catch (error) {
      // Handle error
      console.error("Error making reservation:", error);
      setSuccessMessage("Error making reservation. Please try again.");
    }
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={3} sx={{ padding: "16px", borderRadius: 2 }}>
        <Formik
          initialValues={{
            customerName: "",
            numberOfGuests: "",
            fromDate: "",
            toDate: "",
            phoneNo: "",
            emailId: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Field
                  name="customerName"
                  as={TextField}
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  error={touched.customerName && Boolean(errors.customerName)}
                  helperText={touched.customerName && errors.customerName}
                />
                <Field
                  name="numberOfGuests"
                  as={TextField}
                  label="Number Of Guests"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="number"
                  error={
                    touched.numberOfGuests && Boolean(errors.numberOfGuests)
                  }
                  helperText={touched.numberOfGuests && errors.numberOfGuests}
                />
                <Field
                  name="fromDate"
                  as={TextField}
                  label="From Date"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.fromDate && Boolean(errors.fromDate)}
                  helperText={touched.fromDate && errors.fromDate}
                />
                <Field
                  name="toDate"
                  as={TextField}
                  label="To Date"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.toDate && Boolean(errors.toDate)}
                  helperText={touched.toDate && errors.toDate}
                />
                <Field
                  name="phoneNo"
                  as={TextField}
                  label="Phone No"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  error={touched.phoneNo && Boolean(errors.phoneNo)}
                  helperText={touched.phoneNo && errors.phoneNo}
                />
                <Field
                  name="emailId"
                  as={TextField}
                  label="Email ID"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  error={touched.emailId && Boolean(errors.emailId)}
                  helperText={touched.emailId && errors.emailId}
                />
                <Field
                  name="message"
                  as={TextField}
                  label="Your Message"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  multiline
                  rows={4}
                  error={touched.message && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ mt: 2, width: "100%" }}
                >
                  Reserve Now
                </Button>
                {successMessage && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: successMessage.startsWith("Error")
                        ? "error.main"
                        : "success.main",
                    }}
                  >
                    {successMessage}
                  </Typography>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default ReservationForm;
