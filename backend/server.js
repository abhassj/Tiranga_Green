const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/admin/auth', require('./src/routes/authRoutes'));
app.use('/api/enquiries', require('./src/routes/enquiryRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));

// Error Handler
const errorHandler = require('./src/middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
