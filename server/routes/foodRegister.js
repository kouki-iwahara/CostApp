const express = require('express')
const router = express.Router()
const foodrRegisterController = require('../controllers/foodRegisterController')

router.post('/', foodrRegisterController.registerFood)

module.exports = router
