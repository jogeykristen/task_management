const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  progress: {
    type: DataTypes.STRING,
    defaultValue: 0,
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 0,
  },
});

module.exports = Task;