import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SummaryBox = ({ summaryData = [] }) => {
  return (
    <Box
      sx={{
        marginTop: 2,
        padding: 2,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Summary
      </Typography>
      {summaryData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Guest Count</TableCell>
                <TableCell>Customer Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>To Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaryData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.user_id}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.guestCount}</TableCell>
                  <TableCell>{row.customerEmail}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.fromDate}</TableCell>
                  <TableCell>{row.toDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No summary data available.</Typography>
      )}
    </Box>
  );
};

export default SummaryBox;
