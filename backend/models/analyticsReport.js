const mongoose = require('mongoose');

const analyticsReportSchema = new mongoose.Schema({
    reportDate: { type: Date, default: Date.now },
    startDate: Date,
    endDate: Date,
    totalOrders: Number,
    totalRevenue: Number,
    avgOrderValue: Number,
    topProducts: [{ name: String, totalSales: Number }],
    topCustomers: [{ name: String, totalSpent: Number }],
    regionWiseStats: mongoose.Schema.Types.Mixed,
    categoryWiseStats: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AnalyticsReport', analyticsReportSchema);
