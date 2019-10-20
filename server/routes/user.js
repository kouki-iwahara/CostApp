const express = require('express')
const router = express.Router()
const authenticator = require('../auth/authenticator')

router.get('/home', authenticator.isAuthenticated)

module.exports = router
