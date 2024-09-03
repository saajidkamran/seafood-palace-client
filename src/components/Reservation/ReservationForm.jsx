import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import Features from "./Features";
import Specifications from "./Specifications";
import Location from "./Location";

const ReservationPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Features />;
      case 1:
        return <Specifications />;
      case 2:
        return <Location />;
      default:
        return <Features />;
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reserve Your Space Now
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Secure your event hall with just a few clicks for a seamless reservation
        experience. Enjoy hassle-free planning with instant confirmation and
        personalized support throughout the process.
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <img
              src="https://your-image-url.com"
              alt="Party Hall"
              style={{ width: "100%", borderRadius: "4px 4px 0 0" }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "16px", borderRadius: 2 }}>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                label="Customer Name"
                name="customerName"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                label="Number Of Guests"
                name="numberOfGuests"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                label="Date"
                name="date"
                variant="outlined"
                fullWidth
                margin="dense"
                placeholder="dd/mm/yyyy"
              />
              <TextField
                label="Phone No"
                name="phoneNo"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                label="Email ID"
                name="emailId"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                label="Your Message"
                name="message"
                variant="outlined"
                fullWidth
                margin="dense"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 2, width: "100%" }}
              >
                Reserve Now
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: "20px", textAlign: "center" }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Features" />
          <Tab label="Specifications" />
          <Tab label="Location" />
        </Tabs>
      </Box>

      <Box sx={{ marginTop: "20px" }}>{renderContent()}</Box>
    </Box>
  );
};

export default ReservationPage;
