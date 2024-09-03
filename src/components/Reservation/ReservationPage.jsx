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
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Features from "./Features";
import Specifications from "./Specifications";
import Location from "./Location";
import image_1 from "../../uploads/images/image1.jpg";
import image_2 from "../../uploads/images/image2.jpg";
import image_3 from "../../uploads/images/image3.jpg";
import image_4 from "../../uploads/images/image4.jpg";
import ReservationForm from "./ReservationForm";

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
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "50px",
          width: "50%",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Reserve Your Space Now
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Secure your event hall with just a few clicks for a seamless
          reservation experience. Enjoy hassle-free planning with instant
          confirmation and personalized support throughout the process.
        </Typography>
      </div>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Carousel showArrows autoPlay infiniteLoop>
              <div>
                <img src={image_1} alt="Party Hall 1" />
                <p className="legend">Hall View 1</p>
              </div>
              <div>
                <img src={image_2} alt="Party Hall 2" />
                <p className="legend">Hall View 2</p>
              </div>
              <div>
                <img src={image_3} alt="Party Hall 3" />
                <p className="legend">Hall View 3</p>
              </div>
              <div>
                <img src={image_4} alt="Party Hall 4" />
                <p className="legend">Hall View 4</p>
              </div>
            </Carousel>
          </Paper>
        </Grid>
        <ReservationForm />
      </Grid>
      <Box sx={{ marginTop: "20px", textAlign: "center" }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Features" />
          <Tab label="Specifications" />
          <Tab label="Location" />
        </Tabs>
      </Box>

      <Box sx={{ marginTop: "20px" }}>{renderContent()}</Box>
    </div>
  );
};

export default ReservationPage;
