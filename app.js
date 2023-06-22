const express = require('express');
const db = require('./config/database');
const taskRoutes = require('./routes/taskRoute');
const userRoute  = require('./routes/userRoute')

const app = express();

// Middleware
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoute);

module.exports = app;