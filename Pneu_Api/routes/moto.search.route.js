const express = require('express')
const router = express.Router()


//Load Controllers
const {
    searchTypeController,
    searchPositionController,
    searchMarqueController,
    searchLargeurController,
    searchHauteurController,
    searchDiametreController,
    searchChargeController,
    searchVitesseController,
    searchPneusController
} = require('../controllers/moto.search.controller')

//search par dimension 
router.post('/moto/search/dimension/largeur', searchLargeurController)
router.post('/moto/search/dimension/hauteur', searchHauteurController)
router.post('/moto/search/dimension/diametre', searchDiametreController)
router.post('/moto/search/dimension/charge', searchChargeController)
router.post('/moto/search/dimension/vitesse', searchVitesseController)
router.post('/moto/search/dimension/type', searchTypeController)
router.post('/moto/search/dimension/position', searchPositionController)
router.post('/moto/search/dimension/marque', searchMarqueController)

//resultat recherche 
router.post('/moto/search/pneus', searchPneusController)

module.exports = router