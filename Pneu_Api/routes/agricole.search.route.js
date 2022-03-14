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
    getPneusController,
    activerDesactiverController,
    ajouterPromoController 
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
router.post('/add/pneus/agricole', addPneuController)
router.post('/update/pneus/agricole', updatePneuController)
router.post('/delete/pneus/agricole', deletePneuController)
router.post('/get/pneus/agricole', getPneusController)
router.post('/activer/desactiver/pneu', activerDesactiverController)
router.post('/ajouter/promo/agricole', ajouterPromoController )



module.exports = router