const express = require('express');

const userRoute = require('../controllers/usersController');

const router = express.Router();

router.post('/register', userRoute.userRegister);
router.post('/login', userRoute.userLogin);
router.put('/update', userRoute.userUpdate);
module.exports = router;
