import React from "react";
import ReservationHeader from "./ReservationHeader";
import ReservationTab from "./ReservationTab";

// Explicitly typing the style object
const reservationHeader: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: "2px solid black",
  maxHeight: "100%",
  width: "100%",
};

function Reservation() {
  return (
    <div className="reservationMain_div" style={reservationHeader}>
      {/* Reservation Header  */}
      <ReservationHeader />
      {/* Reservation Tab  */}
      <ReservationTab />
    </div>
  );
}

export default Reservation;
