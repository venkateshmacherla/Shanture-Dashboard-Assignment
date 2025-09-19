const Sales = require('../models/sale');
const AnalyticsReport = require('../models/analyticsReport');

exports.aggregateRevenue = async (startDate, endDate) => {
    return Sales.aggregate([
        { $match: { reportDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalRevenue" },
                avgOrderValue: { $avg: "$totalRevenue" }
            }
        },
        { $project: { _id: 0, totalRevenue: 1, avgOrderValue: 1 } }
    ]);
};

exports.topProducts = async (startDate, endDate) => {
    return Sales.aggregate([
        { $match: { reportDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
        { $group: { _id: "$product", totalSales: { $sum: "$quantity" } } },
        { $sort: { totalSales: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        { $unwind: "$product" },
        { $project: { totalSales: 1, productName: "$product.name" } }
    ]);
};

exports.generateAndSaveReport = async (startDate, endDate) => {
    const salesData = await Sales.aggregate([
        { $match: { reportDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalRevenue" },
                totalOrders: { $sum: "$quantity" },
                avgOrderValue: { $avg: "$totalRevenue" }
            }
        }
    ]);

    const topProductsData = await Sales.aggregate([
        { $match: { reportDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
        { $group: { _id: "$product", totalSales: { $sum: "$quantity" } } },
        { $sort: { totalSales: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        { $unwind: "$product" },
        { $project: { totalSales: 1, productName: "$product.name" } }
    ]);

    const report = new AnalyticsReport({
        startDate,
        endDate,
        totalRevenue: salesData[0]?.totalRevenue || 0,
        totalOrders: salesData[0]?.totalOrders || 0,
        avgOrderValue: salesData[0]?.avgOrderValue || 0,
        topProducts: topProductsData.map(p => ({ name: p.productName, totalSales: p.totalSales })),
        topCustomers: [],
        regionWiseStats: {},
        categoryWiseStats: {},
    });

    await report.save();
    return report;
};
