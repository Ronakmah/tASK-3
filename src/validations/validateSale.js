const Joi = require('joi');
const saleDataSchema = require('./saleDataSchema');

const validateSaleSchema = {
  body: Joi.object({
    saleData: saleDataSchema.required()
  }),
};

module.exports = {
  validateSaleSchema,
};

