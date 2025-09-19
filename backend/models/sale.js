const mongoose = require('mongoose');
const saleSchema = new mongoose.Schema({
    reportDate: Date,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    totalRevenue: Number,
    region: String,
});
module.exports = mongoose.model('Sale', saleSchema);
