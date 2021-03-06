const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')
const authenticator = require('../auth/authenticator')

router.get('/allRecipes', recipeController.getAllUsersRecipes)

router.get('/user', recipeController.getRecipes)
router.post('/', recipeController.registerRecipe)

router.get('/recipeCheckPage', authenticator.isAuthenticated)
router.get('/recipeRegisterPage', authenticator.isAuthenticated)

router.put('/:id', recipeController.updateRecipe)
router.delete('/:id', recipeController.deleteRecipe)
module.exports = router
