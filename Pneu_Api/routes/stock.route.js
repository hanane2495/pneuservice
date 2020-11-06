const express = require('express')
const router = express.Router()

const uploadMulter = require('../middlewares/upload.js')
const validationCSV = require('../middlewares/ValidationCSV')

//Load Controllers
const {
    addStockController,
    getStockController,
    deleteStockController,
    updateStockController
} = require('../controllers/stock.controller')

router.post('/add/stock', uploadMulter, validationCSV, addStockController)
router.post('/get/stock', getStockController)
router.post('/delete/stock', deleteStockController)
router.post('/update/stock', updateStockController)


module.exports = router