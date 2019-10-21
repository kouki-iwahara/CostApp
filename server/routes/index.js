const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')

router.get('/auth', indexController.authenticate)

module.exports = router
