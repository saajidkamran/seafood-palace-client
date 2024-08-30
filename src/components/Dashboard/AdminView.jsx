import React from "react";
import AddReservation from "./AddReservation";
import ManageReservations from "./ManageReservations";
import SummarySection from "./SummarySection";

function AdminView() {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        // border: "2px solid black",
        paddingTop: "20px",
        paddingBottom: "10px",
        justifyContent: "center",
        margin: "0 20px 0 20px",
      }}
    >
      <AddReservation />
      <ManageReservations />
      <SummarySection />
    </div>
  );
}

export default AdminView;
