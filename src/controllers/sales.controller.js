const httpStatus = require("http-status");
console.log("httpStatus", httpStatus);

const { saleService } = require("../services");
const { saleDataSchema, validateSaleSchema } = require('../validations');


const insertSaleData = async (req, res) => {
  const { error } = saleDataSchema.validate(req.body.saleData);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
  }
  try {
    const data = await saleService.insertSaleData(req.body);
    res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error("Insert Sale Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


const getAllSales = async (req, res) => {
  try {
    const data = await saleService.getAllSales();
    res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error("Get All Sales Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


const getSalesByTimeStamps = async (req, res) => {
  try {
    const { start, end } = req.query;
    const data = await saleService.getSalesByTimeStamps(start, end);

    const aggregatedData = {};

    for (const obj of data) {
      if (obj.saleData) {
        for (const key of Object.keys(obj.saleData)) {
          if (!aggregatedData[key]) {
           aggregatedData[key] = { ...obj.saleData[key] };
          } else {
                for (const subKey of Object.keys(obj.saleData[key])) {
              const currentValue = aggregatedData[key][subKey] || 0;
              const newValue = obj.saleData[key][subKey] || 0;

              aggregatedData[key][subKey] = currentValue + newValue;
            }
          }
        }
      }
    }
    res.status(httpStatus.status.OK).json(aggregatedData);
  } catch (error) {
    console.error("Get Sales By TimeStamps Error:", error);
    res.status(httpStatus.status.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


const getSaleById = async (req, res) => {
  try {
    const data = await saleService.getSaleById(req.params.id);
    if (!data) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Sale not found" });
    }
    res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error("Get Sale by ID Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


const updateSale = async (req, res) => {
  try {
    const data = await saleService.updateSale(req.params.id, req.body);
    if (!data) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Sale not found" });
    }
    res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error("Update Sale Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


const deleteSale = async (req, res) => {
  try {
    const data = await saleService.deleteSale(req.params.id);
    if (!data) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Sale not found" });
    }
    res.status(httpStatus.OK).json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("Delete Sale Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


const changeTotalInitiated = async (req, res) => {
  try {
    const { key, action } = req.body;
    const data = await saleService.changeTotalInitiated(req.params.id, key, action);
    if (!data) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Sale not found" });
    }
    res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error("Change Total Initiated Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


const findComplexSales = async (req, res) => {
  try {
    const data = await saleService.findComplexSales();
    res.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error("Find Complex Sales Error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


module.exports = {
  insertSaleData,
  getAllSales,
  getSalesByTimeStamps,
  getSaleById,
  updateSale,
  deleteSale,
  changeTotalInitiated,
  findComplexSales,
};
