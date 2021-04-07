const express = require('express');

const orderRoute = require('../controllers/orderController');

const router = express.Router();

router.post('/add', orderRoute.add);
router.get('/order/:orderId', orderRoute.fetchOrder);
router.get('/orders/:userId', orderRoute.fetchUserOrders);
// router.post('/login', userRoute.userLogin);
module.exports = router;
