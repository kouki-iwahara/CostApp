const express = require('express')
const router = express.Router()
const authenticator = require('../auth/authenticator')

router.post('/', (req, res, next) => {
  authenticator.authenticate(req, res, next)
})

module.exports = router
