const express = require('express')
const router = express.Router()


//Load Controllers
const {
    detailPneuAutoController,
    detailPneuMotoController,
    detailPneuPLController,
    detailPneuAgricoleController
} = require('../controllers/pneu.controller')

router.post('/pneu/details', detailPneuAutoController)
router.post('/pneu/moto/details', detailPneuMotoController )
router.post('/pneu/poids-lourds/details', detailPneuPLController)
router.post('/pneu/agricole/details', detailPneuAgricoleController)

module.exports = router