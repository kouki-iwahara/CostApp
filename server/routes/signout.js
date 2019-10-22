const express = require('express')
const router = express.Router()
const signoutController = require('../controllers/signoutController')

router.post('/', signoutController.signOut)

module.exports = router
