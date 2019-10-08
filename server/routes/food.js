const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')

router.get('/', foodController.getFoodData)
router.post('/', foodController.registerFood)
router.put('/:id', foodController.updateFood)

module.exports = router
