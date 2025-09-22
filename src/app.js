const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
const saleRoutes = require('./router/sales.router');

app.use('/sales', saleRoutes);


module.exports = app;

