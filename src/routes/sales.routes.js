const express = require('express');
const router = express.Router();
const { saleController } = require('../controllers');

router.post('/insert-data', saleController.insertSaleData);
router.get('/', saleController.getAllSales);
router.get('/complex-query', saleController.findComplexSales);
router.get('/by-timestamps', saleController.getSalesByTimeStamps);
router.get('/:id', saleController.getSaleById);
router.put('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);
router.patch('/:id/totalInitiated', saleController.changeTotalInitiated);


module.exports = router;

