const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
require('dotenv/config');
const cors = require('cors');
const app = express()
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')

const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.options('*', cors())

//routes
app.use('/users', userRoutes); 
app.use('/auth', authRoutes)
app.use('/course', courseRoutes)

// Default route for a welcoming message
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f9f9f9; }
                h1 { color: #007BFF; }
                p { color: #555; font-size: 1.2em; }
            </style>
        </head>
        <body>
            <h1>Welcome to the School Management System!</h1>
            <p>Manage your school operations effortlessly and efficiently.</p>
        </body>
        </html>
    `);
});


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
