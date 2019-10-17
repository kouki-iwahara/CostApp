const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')

router.get('/', recipeController.getRecipes)
router.post('/', recipeController.registerRecipe)
router.put('/:id', recipeController.updateRecipe)

module.exports = router
