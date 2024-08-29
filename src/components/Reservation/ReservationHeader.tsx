import { Typography } from "@mui/material";
import React from "react";

const headerStyle: React.CSSProperties = {
  margin: "30px",
  border: "5px solid grey",
  maxHeight: "60px",
  textAlign: "center",
};

function ReservationHeader() {
  return (
    <div style={headerStyle}>
      <Typography variant="h4">Reserver your space now</Typography>
      <Typography variant="subtitle1">
        Secure your event hall with just a few clicks for a seamless reservation
        experince . Enjoy hassle-free planning with instant confirmation and
        personalized support throughout the process
      </Typography>
    </div>
  );
}

export default ReservationHeader;
