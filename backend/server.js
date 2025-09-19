const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/salesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
app.use('/api', analyticsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
