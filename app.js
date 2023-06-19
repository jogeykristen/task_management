const express = require('express');
const db = require('./config/database');
const taskRoutes = require('./routes/taskRoute');
const userRoute  = require('./routes/userRoute')

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoute);

module.exports = app;