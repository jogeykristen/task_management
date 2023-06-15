const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask } = require('../controller/userController');

router.post('/create', createTask);
router.put('/update/:id',updateTask);
router.delete('/delete/:id',deleteTask);
module.exports = router;