const httpStatus = require("http-status");
const saleService = require("../services/sales.services");

// Insert Sale Data
const insertSaleData = async (req, res) => {
  try {
    const data = await saleService.insertSaleData(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.error("Insert Sale Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Sales
const getAllSales = async (req, res) => {
  try {
    const data = await saleService.getAllSales();
    res.status(200).json(data);
  } catch (error) {
    console.error("Get All Sales Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Sale by ID
const getSaleById = async (req, res) => {
  try {
    const data = await saleService.getSaleById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Get Sale by ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update Sale
const updateSale = async (req, res) => {
  try {
    const data = await saleService.updateSale(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Update Sale Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Sale
const deleteSale = async (req, res) => {
  try {
    const data = await saleService.deleteSale(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("Delete Sale Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Change Total Initiated
const changeTotalInitiated = async (req, res) => {
  try {
    const { key, action } = req.body;
    const data = await saleService.changeTotalInitiated(req.params.id, key, action);
    if (!data) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Change Total Initiated Error:", error);
    res.status(500).json({ message: error.message });
  }
};


const findComplexSales = async (req, res) => {
  try {
    const data = await saleService.findComplexSales();
    res.status(200).json(data);
  } catch (error) {
    console.error("Find Complex Sales Error:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  insertSaleData,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  changeTotalInitiated,
  findComplexSales,
};
