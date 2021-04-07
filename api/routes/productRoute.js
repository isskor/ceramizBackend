const express = require('express');

const productRoute = require('../controllers/productController');

const router = express.Router();

router.get('/all', productRoute.productsAll);

module.exports = router;
