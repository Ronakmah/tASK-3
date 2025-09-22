const saleService = require('../services/sales.services');


const insertSaleData = async (req, res) => {
  const data = await saleService.insertSaleData(req.body);
  res.status(200).json(data);
};


const getAllSales = async (req, res) => {
  const data = await saleService.getAllSales();
  res.status(200).json(data);
};


const getSaleById = async (req, res) => {
  const data = await saleService.getSaleById(req.params.id);
  res.status(200).json(data);
};


const updateSale = async (req, res) => {
  const data = await saleService.updateSale(req.params.id, req.body);
  res.status(200).json(data);
};


const deleteSale = async (req, res) => {
  const data = await saleService.deleteSale(req.params.id);
  res.status(200).json(data);
};


const changeTotalInitiated = async (req, res) => {
  const { key, action } = req.body;
  const data = await saleService.changeTotalInitiated(req.params.id, key, action);
  res.status(200).json(data);
};

module.exports = {
  insertSaleData,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  changeTotalInitiated
};
