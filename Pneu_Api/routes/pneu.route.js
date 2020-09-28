const express = require('express')
const router = express.Router()


//Load Controllers
const {
    detailPneuAutoController,
    detailPneuMotoController,
    detailPneuPLController,
    detailPneuAgricoleController,
    livraisonController
} = require('../controllers/pneu.controller')

router.post('/pneu/details', detailPneuAutoController)
router.post('/pneu/moto/details', detailPneuMotoController )
router.post('/pneu/poids-lourds/details', detailPneuPLController)
router.post('/pneu/agricole/details', detailPneuAgricoleController)

router.post('/pneu/Livraison', livraisonController)

module.exports = router