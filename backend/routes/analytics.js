const express = require('express');
const router = express.Router();
const analytics = require('../controllers/analytics');

router.get('/revenue', async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) return res.status(400).json({ error: 'Dates required' });
    try {
        const report = await analytics.generateAndSaveReport(startDate, endDate);
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/top-products', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const result = await analytics.topProducts(startDate, endDate);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/reports', async (req, res) => {
    try {
        const reports = await require('../models/analyticsReport').find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching reports' });
    }
});

module.exports = router;
