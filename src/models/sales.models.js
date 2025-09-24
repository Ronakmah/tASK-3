const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  totalInitiated: Number,
  totalCapturedCount: Number,
  totalCapturedAmount: Number,
  totalDeliveredCount: Number,
  totalDeliveredAmount: Number,
  totalRefundCount: Number,
  totalRefundAmount: Number
}, { _id: false });

const mainSchema = new mongoose.Schema({
  saleData: {
    type: Map,
    of: saleSchema,   
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Sale', mainSchema);