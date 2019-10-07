const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')

router.get('/', foodController.getFoodData)
router.post('/', foodController.registerFood)

module.exports = router
