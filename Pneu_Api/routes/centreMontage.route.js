const express = require('express')
const router = express.Router()


//Load Controllers
const {
    ajouterCentreController,
    getCentreController,
    getAllCentreController,
    deleteCentreController,
    updateCentreController
} = require('../controllers/centreMontage.controller')

router.post('/ajouter/centre/montage', ajouterCentreController)
router.post('/get/centre/montage', getCentreController)
router.post('/get/all/centre/montage', getAllCentreController)
router.post('/delete/centre/montage', deleteCentreController)
router.post('/update/centre/montage', updateCentreController)



module.exports = router