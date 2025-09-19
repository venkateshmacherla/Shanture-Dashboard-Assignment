import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getRevenue = (startDate, endDate) =>
    axios.get(`${API_BASE}/revenue?startDate=${startDate}&endDate=${endDate}`);

export const getTopProducts = (startDate, endDate) =>
    axios.get(`${API_BASE}/top-products?startDate=${startDate}&endDate=${endDate}`);
