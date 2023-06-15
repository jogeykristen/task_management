const express = require('express');
const db = require('./config/database');
const userRoutes = require('./routes/taskRoute');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', userRoutes);

module.exports = app;