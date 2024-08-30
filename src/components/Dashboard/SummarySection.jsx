import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import SummaryBox from "./SummaryBox"; // Adjust the path as needed

const SummarySection = () => {
  const [summaryDates, setSummaryDates] = useState({
    fromDate: "",
    toDate: "",
  });
  const [summaryData, setSummaryData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchSummary = async () => {
    try {
      const { fromDate, toDate } = summaryDates;
      console.log("print data>>", summaryDates);
      const response = await axios.post(
        "http://localhost:3000/reserve/summary",
        {
          fromDate,
          toDate,
        }
      );
      setSummaryData(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 3,
        padding: 2,
        backgroundColor: "lightgray",
        borderRadius: 2,
        marginRight: "800px",
      }}
    >
      <Typography variant="h6">View Reservation Summary</Typography>
      <Box display="flex" gap={2}>
        <TextField
          label="From Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
          value={summaryDates.fromDate}
          onChange={(e) =>
            setSummaryDates({ ...summaryDates, fromDate: e.target.value })
          }
        />
        <TextField
          label="To Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
          value={summaryDates.toDate}
          onChange={(e) =>
            setSummaryDates({ ...summaryDates, toDate: e.target.value })
          }
        />
      </Box>
      <Button
        variant="contained"
        onClick={handleFetchSummary}
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
      >
        Get Summary
      </Button>
      {summaryData && <SummaryBox summaryData={summaryData} />}
    </Box>
  );
};

export default SummarySection;
