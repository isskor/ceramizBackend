const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/products', productRoute);
server.use('/users', userRoute);
server.use('/orders', orderRoute);

module.exports = server;
