const Joi = require('joi');

const saleTypeSchema = Joi.object({
  totalInitiated: Joi.number().min(0).required(),
  totalCapturedCount: Joi.number().min(0).required(),
  totalCapturedAmount: Joi.number().min(0).required(),
  totalDeliveredCount: Joi.number().min(0).required(),
  totalDeliveredAmount: Joi.number().min(0).required(),
  totalRefundCount: Joi.number().min(0).required(),
  totalRefundAmount: Joi.number().min(0).required()
});

const saleDataSchema = Joi.object().pattern(
  Joi.string(),    
  saleTypeSchema  
);


module.exports = saleDataSchema;