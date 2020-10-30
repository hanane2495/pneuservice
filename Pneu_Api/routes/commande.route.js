const express = require('express')
const router = express.Router()


//Load Controllers
const {
    ajouterCommandeController,
    getCommandeController,
    deleteCommandeController,
    updateCommandeController
} = require('../controllers/commande.controller')

router.post('/ajouter/commande', ajouterCommandeController)
router.post('/get/commande', getCommandeController)
router.post('/delete/commande', deleteCommandeController)
router.post('/update/commande', updateCommandeController)



module.exports = router