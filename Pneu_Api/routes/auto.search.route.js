const express = require('express')
const router = express.Router()

//Validation
//const {
//   validRegister,
//   validLogin,
//   resetPasswordValidator,
//   forgotPasswordValidator
//} = require('../helpers/valid')

//Load Controllers
const {
    searchDimensionLargeurController,
    searchDimensionHauteurController,
    searchDimensionDiametreController,
    searchDimensionChargeController,
    searchDimensionVitesseController,
    searchDimensionMarqueController,
    searchVehiculeMarqueController,
    searchVehiculeModeleController,
    searchVehiculeMotorisationController,
    searchVehiculeAnneeController,
    searchVehiculeTailleController,
    searchGetParamsVehicule,
    searchPneusController,
    addPneuController,
    deletePneuController,
    updatePneuController,
    getPneusController 
} = require('../controllers/auto.search.controller')

//search par dimension 
router.get('/search/dimension/largeur', searchDimensionLargeurController)
router.post('/search/dimension/hauteur', searchDimensionHauteurController)
router.post('/search/dimension/diametre', searchDimensionDiametreController)
router.post('/search/dimension/charge', searchDimensionChargeController)
router.post('/search/dimension/vitesse', searchDimensionVitesseController)
router.post('/search/dimension/marque', searchDimensionMarqueController)

//search par vehicule 
router.post('/search/vehicule/marque', searchVehiculeMarqueController)
router.post('/search/vehicule/modele', searchVehiculeModeleController)
router.post('/search/vehicule/motorisation', searchVehiculeMotorisationController)
router.post('/search/vehicule/annee', searchVehiculeAnneeController)
router.post('/search/vehicule/taille', searchVehiculeTailleController)
router.post('/search/vehicule/params', searchGetParamsVehicule)



//resultat recherche 
router.post('/search/pneus', searchPneusController)

//CRUD operations
router.post('/add/pneus', addPneuController)
router.post('/update/pneus', updatePneuController)
router.post('/delete/pneus', deletePneuController)
router.post('/get/pneus', getPneusController)


module.exports = router