const express = require('express')
const router = express.Router()


//Load Controllers
const {
    getMarqueController,
    deleteMarqueController,
    updateMarqueController,
    activerDesactiverController,
    ajouterPromoController
} = require('../controllers/marque.controller')

const uploadMulter = require('../middlewares/upload.js')
const validation = require('../middlewares/validation.js')

router.post('/get/marque', getMarqueController)
router.post('/delete/marque', deleteMarqueController)
router.post('/update/marque', uploadMulter, validation, updateMarqueController)

router.post('/activer/desactiver/collection', activerDesactiverController)
router.post('/ajouter/promo/collection', ajouterPromoController)



module.exports = router