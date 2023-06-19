const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getAllTasks, searchTasks } = require('../controller/taskController');

router.post('/create', createTask);
router.put('/update/:id',updateTask);
router.delete('/delete/:id',deleteTask);
router.get('/getAllTasks',getAllTasks);
router.get('/search/:id',searchTasks);
module.exports = router;