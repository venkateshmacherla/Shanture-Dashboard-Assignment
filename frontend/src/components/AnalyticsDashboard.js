import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date('2023-01-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [revenueData, setRevenueData] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const revenueRes = await axios.get(
                    `http://localhost:5000/api/revenue?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
                );
                setRevenueData(revenueRes.data);

                const productsRes = await axios.get(
                    `http://localhost:5000/api/top-products?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
                );
                setTopProducts(productsRes.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchAnalytics();
    }, [startDate, endDate]);

    const revenueChartOptions = {
        xAxis: { type: 'category', data: ['Revenue', 'Avg Order Value'] },
        yAxis: { type: 'value' },
        series: [
            {
                data: [
                    revenueData?.totalRevenue || 0,
                    revenueData?.avgOrderValue || 0,
                ],
                type: 'bar'
            }
        ]
    };

    const topProductChartOptions = {
        xAxis: { type: 'category', data: topProducts.map(p => p.productName) },
        yAxis: { type: 'value' },
        series: [{ data: topProducts.map(p => p.totalSales), type: 'bar' }]
    };

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h5">Select Date Range</Typography>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                </CardContent>
            </Card>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Revenue Analytics</Typography>
                            <ReactECharts option={revenueChartOptions} />
                        </CardContent>
                    </Card>
                    <Card sx={{ marginTop: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Top Products</Typography>
                            <ReactECharts option={topProductChartOptions} />
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default Dashboard;
