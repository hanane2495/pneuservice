const express = require('express')
const router = express.Router()


//Load Controllers
const {
    ajouterCommandeController,
    getCommandeController,
    deleteCommandeController,
    updateCommandeController,
    validerCommandeController,
    refuserCommandeController
} = require('../controllers/commande.controller')

router.post('/ajouter/commande', ajouterCommandeController)
router.post('/get/commande', getCommandeController)
router.post('/delete/commande', deleteCommandeController)
router.post('/update/commande', updateCommandeController)
router.post('/valider/commande', validerCommandeController)
router.post('/refuser/commande', refuserCommandeController)



module.exports = router