const express = require('express')
const router = express.Router()

const uploadMulter = require('../middlewares/upload.js')
const validation = require('../middlewares/validation')

//Load Controllers
const {
    getImageController,
    updateImageController,
} = require('../controllers/page.controller')

router.post('/get/image', getImageController)
router.post('/update/image', uploadMulter, validation, updateImageController)


module.exports = router