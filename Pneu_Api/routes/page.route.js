const express = require('express')
const router = express.Router()

const uploadMulter = require('../middlewares/upload.js')
const validation = require('../middlewares/validation')

//Load Controllers
const {
    getImageController,
    addImageController,
    updateImageController,
    deleteImageController
} = require('../controllers/page.controller')

router.post('/get/image', getImageController)
router.post('/add/image', uploadMulter, validation, addImageController)
router.post('/update/image', uploadMulter, validation, updateImageController)
router.post('/delete/image', deleteImageController)


module.exports = router