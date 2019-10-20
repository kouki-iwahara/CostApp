const express = require('express')
const router = express.Router()
const authenticator = require('../auth/authenticator')

router.get('/food', authenticator.isAuthenticated)
router.get('/recipe', authenticator.isAuthenticated)

module.exports = router
