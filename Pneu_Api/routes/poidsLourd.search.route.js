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
    searchPneusController,
    addPneuController,
    updatePneuController,
    deletePneuController,
    getPneusController
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

//CRUD operations
router.post('/add/pneus/poids/lourd', addPneuController)
router.post('/update/pneus/poids/lourd', updatePneuController)
router.post('/delete/pneus/poids/lourd', deletePneuController)
router.post('/get/pneus/poids/lourd', getPneusController)

module.exports = router