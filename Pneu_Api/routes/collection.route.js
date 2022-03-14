const express = require('express')
const router = express.Router()


//Load Controllers
const {
    getCollection,
    deleteCollection,
    updateCollection,
    updateImagePneu,
    updateImage_1,
    updateImage_2,
    activerDesactiverController,
    ajouterPromoController
} = require('../controllers/collection.controller')

const uploadCollection = require('../middlewares/uploadCollection')
const validation = require('../middlewares/validation.js')

router.post('/get/collection', getCollection)
router.post('/delete/collection', deleteCollection)
router.post('/update/collection', updateCollection)
router.post('/update/image/pneu', uploadCollection, validation, updateImagePneu)
router.post('/update/image_1', uploadCollection, validation, updateImage_1)
router.post('/update/image_2', uploadCollection, validation, updateImage_2)

router.post('/activer/desactiver/collection', activerDesactiverController)
router.post('/ajouter/promo/collection', ajouterPromoController)



module.exports = router