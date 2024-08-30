import React from "react";
import AddReservation from "./AddReservation";
import ManageReservations from "./ManageReservations";

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
      }}
    >
      <AddReservation />
      <ManageReservations />
    </div>
  );
}

export default AdminView;
