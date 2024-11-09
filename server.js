const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
require('dotenv/config');
const cors = require('cors');
const app = express()
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')

const PORT = 5000
app.use(cors())
app.use(express.json())
app.options('*', cors())

//routes
app.use('/users', userRoutes); 
app.use('/auth', authRoutes)
app.use('/course', courseRoutes)

startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();
