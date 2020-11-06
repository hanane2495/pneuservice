const express = require('express')
const router = express.Router()


//Load Controllers
const {
    addFournisseurController,
    getFournisseurController,
    deleteFournisseurController,
    updateFournisseurController
} = require('../controllers/fournisseur.controller')

router.post('/add/Fournisseur', addFournisseurController)
router.post('/get/Fournisseur', getFournisseurController)
router.post('/delete/Fournisseur', deleteFournisseurController)
router.post('/update/Fournisseur', updateFournisseurController)



module.exports = router