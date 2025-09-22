const Sale = require('../models/sales.models');

const insertSaleData = async (body) => {
  try {
    if (!body || !body.saleData) {
      console.log("No saleData to insert");
      return;
    }

    const saleArray = Array.isArray(body.saleData) ? body.saleData : [body.saleData];
    console.log("Total sales received: ", saleArray.length);

    // Build bulk operations
    const bulkOps = saleArray.map((sale) => ({
      insertOne: { document: { saleData: sale } }
    }));

    const result = await Sale.bulkWrite(bulkOps);
    return result;

  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while inserting sales");
  }
};

const getAllSales = async () => {
  try {
    return await Sale.find();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch sales");
  }
};

const getSaleById = async (id) => {
  try {
    return await Sale.findById(id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch sale by ID");
  }
};

const updateSale = async (id, body) => {
  try {
    return await Sale.findByIdAndUpdate(id, body, { new: true });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update sale");
  }
};

const deleteSale = async (id) => {
  try {
    return await Sale.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete sale");
  }
};

const changeTotalInitiated = async (id, key, action) => {
  try {
    const inc = action === "increment" ? 1 : -1;
    return await Sale.findByIdAndUpdate(
      id,
      { $inc: { [`saleData.${key}.totalInitiated`]: inc } },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change totalInitiated");
  }
};

const findComplexSales = async () => {
  try {
    return await Sale.find({
      $and: [
        {
          "saleData.qr-ticket.totalCapturedCount": { $gt: 500 },
          "saleData.locker-console-booking.totalInitiated": { $gt: 5 }
        },
        {
          $or: [
            { "saleData.metro-card-recharge.totalCapturedAmount": { $gt: 5000 } },
            { "saleData.qr-ticket-airportLine.totalInitiated": { $gt: 10 } }
          ]
        },
        {
          "saleData.qr-ticket.totalCapturedCount": { $in: [100, 200, 300, 1277] } // add required values
        }
      ]
    });
  } catch (error) {
    console.error("Complex query error:", error);
    throw new Error("Failed to fetch sales for complex query");
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
