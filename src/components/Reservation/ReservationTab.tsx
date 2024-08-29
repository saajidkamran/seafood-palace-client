import React from "react";
import CarouselView from "./CarouselView";
import RegisterMenue from "./RegisterMenue";

function ReservationTab() {
  return (
    <div
      style={{
        border: "5px solid grey",
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* cariusel */}
      <CarouselView />
      {/* registermenue */}
      <RegisterMenue />
    </div>
  );
}

export default ReservationTab;
