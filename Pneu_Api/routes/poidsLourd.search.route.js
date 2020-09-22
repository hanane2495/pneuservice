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
    searchPneusController
} = require('../controllers/poidsLourd.search.controller')

//search par dimension 
router.post('/poidsLourd/search/dimension/largeur', searchLargeurController)
router.post('/poidsLourd/search/dimension/hauteur', searchHauteurController)
router.post('/poidsLourd/search/dimension/diametre', searchDiametreController)
router.post('/poidsLourd/search/dimension/type', searchTypeController)
router.post('/poidsLourd/search/dimension/position', searchPositionController)
router.post('/poidsLourd/search/dimension/marque', searchMarqueController)

//resultat recherche 
router.post('/poidsLourds/search/pneus', searchPneusController)

module.exports = router