const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
const {saleRoutes} = require('./routes');

app.use('/sales', saleRoutes);


module.exports = app;

