const express = require('express')
const router = express.Router()

//Validation
const {
   validRegister,
   validLogin,
   resetPasswordValidator,
   forgotPasswordValidator
} = require('../helpers/valid')

const uploadMulter = require('../middlewares/upload.js')
const validation = require('../middlewares/validation.js')

//Load Controllers
const {
    addUserController,
    updateUserController,
    activationController,
    loginController,
    forgetPasswordController,
    resetPasswordController
} = require('../controllers/admin.auth.controller')

router.post('/add/user', validRegister, addUserController)
router.post('/activation', activationController)
router.post('/login', validLogin, loginController)
router.put('/password/forget',forgotPasswordValidator, forgetPasswordController)
router.put('/password/reset',resetPasswordValidator, resetPasswordController)

router.post('/update/user', uploadMulter, validation, updateUserController)


module.exports = router