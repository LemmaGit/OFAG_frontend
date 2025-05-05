import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DataTable = ({
  columns = [],
  data = [],
  className = "",
  headClassName = "",
}) => {
  return (
    <Paper className={`shadow-lg ${className}`}>
      <TableContainer>
        <Table>
          <TableHead className={headClassName}>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index}>
                  <strong>{col}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {Object.entries(item).map(([_, value], index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
