const express = require('express')
const router = express.Router()

const uploadMulter = require('../middlewares/upload.js')
const validation = require('../middlewares/validation')

//Load Controllers
const {
    AddPromoController,
    getPromoController,
    deletePromoController,
    updatePromoController,
} = require('../controllers/promo.controller')

router.post('/add/promo', AddPromoController)
router.post('/get/promo', getPromoController)
router.post('/delete/promo', deletePromoController)
router.post('/update/promo', updatePromoController)


module.exports = router