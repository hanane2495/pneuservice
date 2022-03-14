const express = require('express')
const router = express.Router()


//Load Controllers
const {
    addMappingController,
    getAllMappingController,
    getMappingFournisseurController,
    deleteMappingController,
    updateMappingController,
    ProduitNonMappeeController
} = require('../controllers/mapping.controller')

router.post('/add/mapping', addMappingController)
router.post('/get/all/mapping', getAllMappingController)
router.post('/get/mapping/fournisseur', getMappingFournisseurController)
router.post('/delete/mapping', deleteMappingController)
router.post('/update/mapping', updateMappingController)
router.post('/send/produit/nonmappee', ProduitNonMappeeController)




module.exports = router