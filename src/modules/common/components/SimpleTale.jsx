import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const SimpleTable = ({ columns = [], data = [] }) => {
    return (
        <Table sx={{ backgroundColor: "primary.light" }}>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell key={column} sx={{ color: "white.main", fontSize: "14px", fontWeight: 600 }}>{column.name}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} sx={{ borderBottom: "1px solid #000" }}>
                        {columns.map((column, columnIndex) => (
                            <TableCell sx={{ color: "white.main" }} key={`${rowIndex}-${columnIndex}`}>
                                {row[column.id]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default SimpleTable;
