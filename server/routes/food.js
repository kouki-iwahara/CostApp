const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')
const authenticator = require('../auth/authenticator')

router.get('/', foodController.getFoodData)
router.post('/', foodController.registerFood)
router.put('/:id', foodController.updateFood)
router.delete('/:id', foodController.deleteFood)

router.get('/foodRegisterPage', authenticator.isAuthenticated)

module.exports = router
