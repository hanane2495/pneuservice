const express = require('express')
const router = express.Router()


//Load Controllers
const {
    searchTypeController,
    searchMarqueController,
    searchLargeurController,
    searchHauteurController,
    searchDiametreController,
    searchPneusController,
    addPneuController,
    updatePneuController,
    deletePneuController,
    getPneusController
} = require('../controllers/Agricole.search.controller')

//search par dimension 
router.post('/agricole/search/dimension/largeur', searchLargeurController)
router.post('/agricole/search/dimension/hauteur', searchHauteurController)
router.post('/agricole/search/dimension/diametre', searchDiametreController)
router.post('/agricole/search/dimension/type', searchTypeController)
router.post('/agricole/search/dimension/marque', searchMarqueController)

//resultat recherche 
router.post('/agricole/search/pneus', searchPneusController)

//CRUD operations
router.post('/add/pneus', addPneuController)
router.post('/update/pneus', updatePneuController)
router.post('/delete/pneus', deletePneuController)
router.post('/get/pneus', getPneusController)

module.exports = router