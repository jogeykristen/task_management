const express = require('express');
const router = express.Router();
const{ createUser, Login } = require('../controller/userController')

router.post('/create',createUser);
router.post('/login',Login);

module.exports = router;