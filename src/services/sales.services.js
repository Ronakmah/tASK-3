const Sale = require('../models/sales.models');

const insertSaleData = async (body) => {
  if (!body || !body.saleData) {
    console.log("No saleData to insert");
    return;
  }
  const sale = new Sale({ saleData: body.saleData });
  return await sale.save();
};

const getAllSales = async () => {
  return await Sale.find();
};

const getSaleById = async (id) => {
  return await Sale.findById(id);
};

const updateSale = async (id, body) => {
  return await Sale.findByIdAndUpdate(id, body, { new: true });
};

const deleteSale = async (id) => {
  return await Sale.findByIdAndDelete(id);
};

const changeTotalInitiated = async (id, key, action) => {
  const inc = action === "increment" ? 1 : -1;
  return await Sale.findByIdAndUpdate(
    id,
    { $inc: { [`saleData.${key}.totalInitiated`]: inc } },
    { new: true }
  );
};

module.exports = {
  insertSaleData,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  changeTotalInitiated
};
