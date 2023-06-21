const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getAllTasks, searchTasks } = require('../controller/taskController');
const authorize = require('../authorization/tokenauthorization');

router.post('/create', authorize('admin'), createTask);
router.put('/update/:id', authorize(['user', 'admin']), updateTask);
router.delete('/delete/:id', authorize('admin'), deleteTask);
router.get('/getAllTasks', authorize(['user', 'admin']), getAllTasks);
router.get('/search/:id', authorize(['user', 'admin']), searchTasks);

module.exports = router;
