import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const ReportHistoryPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/reports")
            .then((response) => {
                setReports(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reports:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Paper sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
                Reports History
            </Typography>
            {reports.length === 0 ? (
                <Typography>No reports found.</Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date Range</TableCell>
                            <TableCell>Total Revenue</TableCell>
                            <TableCell>Average Order Value</TableCell>
                            <TableCell>Generated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report._id}>
                                <TableCell>{report.startDate} - {report.endDate}</TableCell>
                                <TableCell>{report.totalRevenue.toLocaleString()}</TableCell>
                                <TableCell>{report.avgOrderValue.toFixed(2)}</TableCell>
                                <TableCell>{new Date(report.generatedAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Paper>
    );
};

export default ReportHistoryPage;
